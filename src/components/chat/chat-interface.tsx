"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, File, X } from "lucide-react";
import { useChatStore, Message } from "@/hooks/use-chat-store";
import { listUploadsAction } from "@/action/uploads.action";
import { ChatMessage } from "./chat-message";
import { PdfReferenceModal } from "./pdf-reference-modal";

interface ChatInterfaceProps {
  chatId: string;
}

interface PdfReference {
  id: string;
  name: string;
}

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfReferences, setPdfReferences] = useState<PdfReference[]>([]);
  const [availablePdfs, setAvailablePdfs] = useState<any[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { chats, addMessage, updateMessage } = useChatStore();
  const currentChat = chats.find((chat) => chat.id === chatId);

  useEffect(() => {
    loadAvailablePdfs();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const loadAvailablePdfs = async () => {
    try {
      const result = await listUploadsAction();
      if (result.success) {
        setAvailablePdfs(result.data);
      }
    } catch (error) {
      console.error("Failed to load PDFs:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }

    // Handle @ symbol for PDF referencing
    if (e.key === "@") {
      setShowPdfModal(true);
    }
  };

  const handlePdfSelect = (pdf: any) => {
    const reference: PdfReference = {
      id: pdf.id,
      name: pdf.pdf_name,
    };
    setPdfReferences((prev) => [...prev, reference]);
    setShowPdfModal(false);
  };

  const removePdfReference = (id: string) => {
    setPdfReferences((prev) => prev.filter((ref) => ref.id !== id));
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setIsLoading(true);

    // Add user message
    addMessage(chatId, {
      content: userMessage,
      role: "user",
    });

    // Create assistant message placeholder
    const assistantMessageId = Date.now().toString();
    addMessage(chatId, {
      content: "",
      role: "assistant",
      isStreaming: true,
    });

    try {
      // Prepare conversation history
      const conversationHistory =
        currentChat?.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })) || [];

      // Prepare request data
      const requestData = {
        pdf_ids: pdfReferences.map((ref) => ref.id),
        message: userMessage,
        conversation_history: conversationHistory.slice(0, -2), // Exclude the last two messages we just added
      };

      // Make streaming request
      const response = await fetch("http://localhost:8001/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                fullResponse += data.content;
                updateMessage(chatId, assistantMessageId, fullResponse);
              }
            } catch (e) {
              // Ignore malformed JSON
            }
          }
        }
      }

      // Mark streaming as complete
      updateMessage(chatId, assistantMessageId, fullResponse);
    } catch (error) {
      console.error("Chat error:", error);
      updateMessage(
        chatId,
        assistantMessageId,
        "Sorry, I encountered an error. Please try again."
      );
    } finally {
      setIsLoading(false);
      setPdfReferences([]); // Clear references after sending
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="font-semibold text-lg">
          {currentChat?.title || "Chat"}
        </h2>
        {pdfReferences.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {pdfReferences.map((ref) => (
              <Badge
                key={ref.id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <File className="w-3 h-3" />
                {ref.name}
                <button
                  onClick={() => removePdfReference(ref.id)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {currentChat?.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Use @ to reference PDFs)"
              className="resize-none"
              rows={3}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            size="lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PDF Reference Modal */}
      <PdfReferenceModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        pdfs={availablePdfs}
        onSelect={handlePdfSelect}
      />
    </div>
  );
}
