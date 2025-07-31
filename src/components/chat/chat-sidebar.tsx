"use client";

import { Chat } from "@/hooks/use-chat-store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, MessageSquare } from "lucide-react";
import { useChatStore } from "@/hooks/use-chat-store";

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

export function ChatSidebar({
  chats,
  activeChat,
  onSelectChat,
}: ChatSidebarProps) {
  const { deleteChat } = useChatStore();

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(chatId);
    }
  };

  return (
    <ScrollArea className="flex-1">
      <div className="p-3 space-y-2">
        {chats.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No chats yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Create your first chat to get started
            </p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`group cursor-pointer rounded-lg p-3 border transition-all duration-200 ${
                activeChat?.id === chat.id
                  ? "bg-blue-50 border-blue-200 shadow-sm"
                  : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
              onClick={() => onSelectChat(chat)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="w-60 trucate font-medium text-sm text-gray-900 truncate mb-1">
                    {chat.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{chat.messages.length} messages</span>
                    {chat.pdfReferences && chat.pdfReferences.length > 0 && (
                      <>
                        <span>•</span>
                        <span>{chat.pdfReferences.length} PDFs</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 h-auto hover:bg-red-50"
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                >
                  <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
