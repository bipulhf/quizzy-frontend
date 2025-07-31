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
  const selectedItemRef = useRef<HTMLButtonElement>(null);
  const selectedIndexRef = useRef(0);

  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.pdf_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Keep ref in sync with state
  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  // Auto-scroll to selected item
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

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
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || filteredPdfs.length === 0) {
        console.log(
          "KeyDown ignored - isOpen:",
          isOpen,
          "filteredPdfs.length:",
          filteredPdfs.length
        );
        return;
      }

      console.log(
        "KeyDown event:",
        e.key,
        "current selectedIndex:",
        selectedIndexRef.current
      );

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          e.stopPropagation();
          setSelectedIndex((prev) => {
            const newIndex = prev < filteredPdfs.length - 1 ? prev + 1 : 0;
            console.log(
              "Arrow Down: prev =",
              prev,
              "new =",
              newIndex,
              "filteredPdfs.length =",
              filteredPdfs.length
            );
            return newIndex;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          e.stopPropagation();
          setSelectedIndex((prev) => {
            const newIndex = prev > 0 ? prev - 1 : filteredPdfs.length - 1;
            console.log(
              "Arrow Up: prev =",
              prev,
              "new =",
              newIndex,
              "filteredPdfs.length =",
              filteredPdfs.length
            );
            return newIndex;
          });
          break;
        case "Enter":
          e.preventDefault();
          e.stopPropagation();
          const currentIndex = selectedIndexRef.current;
          if (filteredPdfs[currentIndex]) {
            console.log(
              "Enter pressed: selecting PDF at index",
              currentIndex,
              filteredPdfs[currentIndex].pdf_name
            );
            onSelect(filteredPdfs[currentIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          e.stopPropagation();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredPdfs, onSelect, onClose]); // Removed selectedIndex from deps

  if (!isOpen || filteredPdfs.length === 0) return null;

  return (
    <div
      ref={selectorRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-80 max-w-[90vw]"
      style={{
        top: position.top,
        left: Math.min(
          position.left,
          (typeof window !== "undefined" ? window.innerWidth : 1024) - 320 - 16
        ), // Ensure it doesn't go off-screen
      }}
    >
      <div className="p-3 border-b border-gray-100">
        <div className="text-xs text-gray-500 font-medium">
          Select PDF to reference ({filteredPdfs.length} found)
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Selected: {selectedIndex + 1} of {filteredPdfs.length}
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto">
        <div className="p-1">
          {filteredPdfs.map((pdf, index) => (
            <button
              key={pdf.pdf_id}
              ref={index === selectedIndex ? selectedItemRef : null}
              className={`w-full text-left p-3 rounded-md transition-colors border ${
                index === selectedIndex
                  ? "bg-blue-100 border-blue-300 shadow-sm"
                  : "border-transparent hover:bg-gray-50 hover:border-gray-200"
              }`}
              onClick={() => onSelect(pdf)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-center gap-3">
                <File className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      index === selectedIndex
                        ? "text-blue-900"
                        : "text-gray-900"
                    }`}
                  >
                    {index === selectedIndex && "→ "}
                    {pdf.pdf_name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(pdf.created_at).toLocaleDateString()}
                  </p>
                </div>
                {index === selectedIndex && (
                  <div className="text-blue-600 text-xs font-bold">●</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <div className="text-xs text-gray-500 flex items-center justify-between">
          <span>↑↓ navigate • Enter select • Esc close</span>
          <span className="text-gray-400">
            {selectedIndex + 1}/{filteredPdfs.length}
          </span>
        </div>
      </div>
    </div>
  );
}
