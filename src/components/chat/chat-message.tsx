"use client";

import { Message } from "@/hooks/use-chat-store";
import { Card } from "@/components/ui/card";
import { User, Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex ${isAssistant ? "justify-start" : "justify-end"} mb-6`}
    >
      <div
        className={`flex gap-3 max-w-[85%] ${
          isAssistant ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
            isAssistant
              ? "bg-blue-100 border border-blue-200"
              : "bg-gray-100 border border-gray-200"
          }`}
        >
          {isAssistant ? (
            <Bot className="w-5 h-5 text-blue-600" />
          ) : (
            <User className="w-5 h-5 text-gray-600" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={`flex flex-col ${
            isAssistant ? "items-start" : "items-end"
          }`}
        >
          <Card
            className={`p-4 shadow-sm transition-all duration-200 ${
              isAssistant
                ? "bg-white border-gray-200 hover:shadow-md"
                : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
            }`}
          >
            <div className="flex items-start gap-2">
              <div className="flex-1">
                {isAssistant ? (
                  <div
                    className={`prose prose-sm max-w-none ${
                      isAssistant ? "prose-gray" : "prose-invert"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-3 last:mb-0 leading-relaxed">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-gray-900">
                            {children}
                          </strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-3 pl-4 space-y-1">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-3 pl-4 space-y-1">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-700">{children}</li>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                )}
              </div>
              {message.isStreaming && (
                <Loader2 className="w-4 h-4 animate-spin text-gray-400 flex-shrink-0 mt-1" />
              )}
            </div>
          </Card>

          {/* Timestamp */}
          <div className="text-xs text-gray-500 mt-1 px-1">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
