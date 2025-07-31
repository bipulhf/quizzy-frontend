"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { File } from "lucide-react";
import { UploadType } from "@/lib/types";

interface PdfInlineSelectorProps {
  isOpen: boolean;
  searchTerm: string;
  pdfs: UploadType[];
  onSelect: (pdf: UploadType) => void;
  onClose: () => void;
  position: { top: number; left: number };
}

export function PdfInlineSelector({
  isOpen,
  searchTerm,
  pdfs,
  onSelect,
  onClose,
  position,
}: PdfInlineSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectorRef = useRef<HTMLDivElement>(null);

  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.pdf_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredPdfs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredPdfs.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredPdfs.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredPdfs[selectedIndex]) {
            onSelect(filteredPdfs[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredPdfs, selectedIndex, onSelect, onClose]);

  if (!isOpen || filteredPdfs.length === 0) return null;

  return (
    <div
      ref={selectorRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-w-xs w-72"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="p-2 border-b border-gray-100">
        <div className="text-xs text-gray-500 font-medium">
          Select PDF to reference ({filteredPdfs.length} found)
        </div>
      </div>

      <ScrollArea className="max-h-48">
        <div className="p-1">
          {filteredPdfs.map((pdf, index) => (
            <button
              key={pdf.pdf_id}
              className={`w-full text-left p-2 rounded-md transition-colors ${
                index === selectedIndex
                  ? "bg-blue-50 border border-blue-200"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onSelect(pdf)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-center gap-2">
                <File className="w-3 h-3 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {pdf.pdf_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(pdf.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-2 border-t border-gray-100">
        <div className="text-xs text-gray-400">
          ↑↓ navigate • Enter select • Esc close
        </div>
      </div>
    </div>
  );
}
