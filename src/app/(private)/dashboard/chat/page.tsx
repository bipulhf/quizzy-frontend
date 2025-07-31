"use client";

import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useChatStore } from "@/hooks/use-chat-store";

export default function ChatPage() {
  const {
    chats,
    activeChat,
    createNewChat,
    setActiveChat,
    loadChatsFromStorage,
  } = useChatStore();

  useEffect(() => {
    loadChatsFromStorage();
  }, [loadChatsFromStorage]);

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <Button
            onClick={createNewChat}
            className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeChat ? (
          <ChatInterface chatId={activeChat.id} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
                <Plus className="w-10 h-10 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Welcome to Chat
              </h2>
              <p className="text-gray-600 mb-6">
                Start a conversation by creating a new chat or selecting an
                existing one. You can reference PDFs and ask questions about
                their content.
              </p>
              <Button
                onClick={createNewChat}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Chat
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
