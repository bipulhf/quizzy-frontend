import { FileQuestion } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto  flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <FileQuestion className="h-6 w-6" />
          <span className="text-xl font-bold">QuizPDF</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex">
            Sign Up
          </Button>
          <Button className="md:flex">Log In</Button>
        </div>
      </nav>
    </header>
  );
};
