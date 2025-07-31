"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, File, X, Hash, Loader2 } from "lucide-react";
import { useChatStore } from "@/hooks/use-chat-store";
import { ChatMessage } from "./chat-message";
import { PdfInlineSelector } from "./pdf-inline-selector";
import { listUploadsAction } from "@/action/uploads.action";
import { UploadType } from "@/lib/types";
import { PdfReference } from "@/hooks/use-chat-store";
import { AI_URL } from "@/lib/data";

interface ChatInterfaceProps {
  chatId: string;
}

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfSelector, setShowPdfSelector] = useState(false);
  const [pdfSearchTerm, setPdfSearchTerm] = useState("");
  const [selectorPosition, setSelectorPosition] = useState({ top: 0, left: 0 });
  const [availablePdfs, setAvailablePdfs] = useState<UploadType[]>([]);
  const [atSymbolPosition, setAtSymbolPosition] = useState<number>(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { chats, addMessage, updateMessage, updateChatPdfReferences } =
    useChatStore();
  const currentChat = chats.find((chat) => chat.id === chatId);

  useEffect(() => {
    loadAvailablePdfs();
  }, []);

  // Removed useEffect that scrolled on every currentChat.messages change

  useEffect(() => {
    // When switching to a new chat, scroll to the bottom.
    // A small delay can help ensure content is rendered and scroll position is calculated correctly.
    if (messagesEndRef.current) {
      setTimeout(() => forceScrollToBottom(), 50);
    }
  }, [chatId]);

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

  const forceScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const SCROLL_THRESHOLD = 50; // pixels
  const conditionalScrollToBottom = () => {
    const scrollAreaRoot = scrollAreaRef.current;
    if (scrollAreaRoot) {
      // For shadcn/ui ScrollArea, the viewport is a child with a specific data attribute
      const viewport = scrollAreaRoot.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLDivElement;
      if (viewport) {
        const { scrollHeight, scrollTop, clientHeight } = viewport;
        // If the user is within SCROLL_THRESHOLD of the bottom, then scroll.
        if (scrollHeight - scrollTop <= clientHeight + SCROLL_THRESHOLD) {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Fallback if viewport not found (e.g., structure changed or error in selector)
        // console.warn("Scroll viewport not found, falling back to force scroll for safety.");
        forceScrollToBottom();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !showPdfSelector) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPosition = e.target.selectionStart;

    setMessage(value);

    // Check for @ symbol
    const atIndex = value.lastIndexOf("@", cursorPosition - 1);
    if (atIndex !== -1 && (atIndex === 0 || value[atIndex - 1] === " ")) {
      const searchTerm = value.substring(atIndex + 1, cursorPosition);
      if (!searchTerm.includes(" ")) {
        // Show PDF selector
        setPdfSearchTerm(searchTerm);
        setAtSymbolPosition(atIndex);
        setShowPdfSelector(true);

        // Calculate position for dropdown
        if (textareaRef.current) {
          const rect = textareaRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const dropdownHeight = 200; // Approximate height

          // Position above input if not enough space below
          const shouldPositionAbove =
            rect.bottom + dropdownHeight > viewportHeight;

          setSelectorPosition({
            top: shouldPositionAbove
              ? rect.top - dropdownHeight - 8
              : rect.bottom + 4,
            left: Math.max(rect.left, 16), // Ensure it doesn't go off-screen left
          });
        }
      } else {
        setShowPdfSelector(false);
      }
    } else {
      setShowPdfSelector(false);
    }
  };

  const handlePdfSelect = (pdf: UploadType) => {
    const reference: PdfReference = {
      id: pdf.pdf_id,
      name: pdf.pdf_name,
    };

    // Add to chat references
    const currentReferences = currentChat?.pdfReferences || [];
    if (!currentReferences.find((ref) => ref.id === reference.id)) {
      updateChatPdfReferences(chatId, [...currentReferences, reference]);
    }

    // Replace @searchTerm with the PDF name in the message
    if (atSymbolPosition !== -1) {
      const beforeAt = message.substring(0, atSymbolPosition);
      const afterSearch = message.substring(
        atSymbolPosition + 1 + pdfSearchTerm.length
      );
      const newMessage = `${beforeAt}@${pdf.pdf_name}${afterSearch}`;
      setMessage(newMessage);
    }

    setShowPdfSelector(false);
    setPdfSearchTerm("");
    setAtSymbolPosition(-1);

    // Focus back to textarea
    textareaRef.current?.focus();
  };

  const closePdfSelector = () => {
    setShowPdfSelector(false);
    setPdfSearchTerm("");
    setAtSymbolPosition(-1);
  };

  const removePdfReference = (id: string) => {
    const currentReferences = currentChat?.pdfReferences || [];
    updateChatPdfReferences(
      chatId,
      currentReferences.filter((ref) => ref.id !== id)
    );
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
    forceScrollToBottom(); // Scroll when user sends a message

    // Create assistant message placeholder
    const assistantMessageId = addMessage(chatId, {
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
        pdf_ids: currentChat?.pdfReferences?.map((ref) => ref.id) || [],
        message: userMessage,
        conversation_history: conversationHistory.slice(0, -2),
      };

      // Make streaming request
      const response = await fetch(`${AI_URL}/pdf/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        console.error("Response not OK:", response.status, response.statusText);
        throw new Error("Failed to get response");
      }

      console.log("Response OK, starting to read stream...");

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      let fullResponse = "";
      let currentStatus = "";
      let sources: string[] = [];
      let isGeneratingResponse = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream finished");
          break;
        }

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const parsedData = JSON.parse(line.slice(6));
              console.log("Parsed streaming data:", parsedData);

              if (parsedData.type === "status") {
                currentStatus = parsedData.data;
                console.log("Status update:", currentStatus);

                if (!isGeneratingResponse) {
                  console.log(
                    "Updating message with status:",
                    `*${currentStatus}*`
                  );
                  updateMessage(
                    chatId,
                    assistantMessageId,
                    `*${currentStatus}*`
                  );
                  conditionalScrollToBottom(); // Conditional scroll during streaming status updates
                }
              } else if (parsedData.type === "sources") {
                sources = parsedData.data;
                console.log("Sources received:", sources);

                const sourceText =
                  sources.length > 0
                    ? `**Sources:** ${sources.join(", ")}\n\n`
                    : "";
                console.log("Updating message with sources:", sourceText);
                updateMessage(chatId, assistantMessageId, sourceText);
                conditionalScrollToBottom(); // Conditional scroll during streaming source updates
              } else if (parsedData.type === "content") {
                isGeneratingResponse = true;
                fullResponse += parsedData.data;

                let displayMessage = "";
                if (sources.length > 0) {
                  displayMessage += `**Sources:** ${sources.join(", ")}\n\n`;
                }
                displayMessage += fullResponse;

                console.log(
                  "Content chunk received. Full response so far:",
                  fullResponse
                );
                console.log(
                  "Updating message with:",
                  displayMessage.substring(0, 100) + "..."
                );

                updateMessage(chatId, assistantMessageId, displayMessage);
              } else if (parsedData.type === "done") {
                console.log("Stream done, finalizing message");

                let finalMessage = "";
                if (sources.length > 0) {
                  finalMessage += `**Sources:** ${sources.join(", ")}\n\n`;
                }
                finalMessage += fullResponse;

                console.log("Final message:", finalMessage);
                updateMessage(chatId, assistantMessageId, finalMessage);
                break;
              }
            } catch (e) {
              console.warn("Failed to parse streaming data:", line, e);
            }
          }
        }
      }

      console.log("Stream processing complete");
    } catch (error) {
      console.error("Chat error:", error);
      updateMessage(
        chatId,
        assistantMessageId,
        "Sorry, I encountered an error. Please try again."
      );
    } finally {
      console.log("Setting loading to false");
      setIsLoading(false);
      // Removed setPdfReferences([]) as it's store-managed
    }
  }; // This is the correct end of handleSendMessage

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-xl text-gray-900">
            {currentChat?.title || "New Chat"}
          </h2>
        </div>

        {/* PDF References Section */}
        {currentChat?.pdfReferences && currentChat.pdfReferences.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-gray-500 mb-2">
              Referenced PDFs:
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentChat.pdfReferences.map((ref) => (
                <Badge
                  key={ref.id}
                  variant="outline"
                  className="flex items-center gap-1.5 py-1.5 px-3 border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <File className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium max-w-32 truncate">
                    {ref.name}
                  </span>
                  <button
                    onClick={() => removePdfReference(ref.id)}
                    className="ml-1 p-0.5 rounded-full hover:bg-blue-200 transition-colors"
                    aria-label={`Remove ${ref.name} reference`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-2" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {currentChat?.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {currentChat?.messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center py-12">
              <div className="text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <File className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Start a conversation
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Ask questions about your PDFs or have a general conversation.
                  Use @ to reference specific documents.
                </p>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10 shadow-sm">
        <div className="flex items-end gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setMessage(message + "@");
              textareaRef.current?.focus();
            }}
            className="flex-shrink-0 border-gray-300 hover:bg-gray-100"
            aria-label="Reference PDF"
            title="Reference PDF (@)"
          >
            <Hash className="w-4 h-4 text-gray-600" />
          </Button>
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={
                currentChat?.pdfReferences &&
                currentChat.pdfReferences.length > 0
                  ? `Ask about ${currentChat.pdfReferences
                      .map((ref) => ref.name)
                      .join(", ")}... Use @ for more PDFs`
                  : "Type your message... Use @ to reference PDFs"
              }
              className="resize-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 min-h-[44px] max-h-[120px] text-sm"
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "inherit";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            size="icon"
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-md w-11 h-11"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* PDF Inline Selector */}
      <PdfInlineSelector
        isOpen={showPdfSelector}
        searchTerm={pdfSearchTerm}
        pdfs={availablePdfs}
        onSelect={handlePdfSelect}
        onClose={closePdfSelector}
        position={selectorPosition}
      />
    </div>
  );
}
