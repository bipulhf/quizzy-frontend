import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  FileText,
  MessageSquare,
  Share2,
  Trophy,
  ChevronRight,
  CheckCircle2,
  Upload,
  FileQuestion,
  Users,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col container mx-auto">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Introducing QuizPDF
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Transform PDFs into Interactive Quizzes with AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Upload your PDFs, create customized quizzes, share with
                  others, and track performance—all in one platform.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-2">
                    Get Started <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto overflow-hidden rounded-xl border bg-background md:aspect-[4/3] lg:aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20"></div>
                <div className="flex h-full items-center justify-center p-6">
                  <div className="relative w-full max-w-[80%] rounded-lg border bg-background p-4 shadow-lg">
                    <div className="flex items-center gap-2 border-b pb-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Creating Quiz from "Machine Learning Basics.pdf"
                      </span>
                    </div>
                    <div className="mt-3 space-y-3">
                      <div className="h-4 w-3/4 rounded-full bg-muted"></div>
                      <div className="h-4 w-full rounded-full bg-muted"></div>
                      <div className="h-4 w-5/6 rounded-full bg-muted"></div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button size="sm" className="text-xs">
                        Generate Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need for PDF-Based Quizzes
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform makes it easy to create, share, and
                  analyze quizzes from your PDF documents.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Topic-Based Quizzes</h3>
                <p className="text-center text-muted-foreground">
                  Create quizzes on specific topics from a single PDF document
                  with AI-generated questions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Page Range Quizzes</h3>
                <p className="text-center text-muted-foreground">
                  Select specific page ranges from your PDFs to create focused
                  quizzes on particular sections.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Upload className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Multi-PDF Quizzes</h3>
                <p className="text-center text-muted-foreground">
                  Combine content from multiple PDFs to create comprehensive
                  quizzes across different sources.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Chat with PDFs</h3>
                <p className="text-center text-muted-foreground">
                  Ask questions about your PDFs and mention specific documents
                  using the @ symbol in the chat.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Share2 className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Quiz Sharing</h3>
                <p className="text-center text-muted-foreground">
                  Share quizzes with others and allow multiple users to
                  participate in your created quizzes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Trophy className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Leaderboards</h3>
                <p className="text-center text-muted-foreground">
                  Track performance with ranking boards to see how participants
                  compare to each other.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Create Quizzes in Minutes
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our simple process makes it easy to go from PDF to quiz in
                  just a few steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Upload Your PDFs</h3>
                <p className="text-muted-foreground">
                  Upload one or multiple PDF documents to our secure platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Choose Quiz Type</h3>
                <p className="text-muted-foreground">
                  Select from topic-based, page range, or multi-PDF quiz
                  options.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Generate & Share</h3>
                <p className="text-muted-foreground">
                  Our AI creates questions, and you can share the quiz with
                  participants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Quiz Demo Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Live Quiz System
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Real-time Quiz Participation
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Create engaging live quiz sessions where participants can join
                  in real-time and compete against each other.
                </p>
                <ul className="space-y-2">
                  {[
                    "Real-time participant tracking",
                    "Live leaderboard updates",
                    "Interactive question display",
                    "Instant feedback on answers",
                    "Comprehensive results dashboard",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mx-auto overflow-hidden rounded-xl border bg-background">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-500 opacity-10"></div>
                <div className="flex h-full items-center justify-center p-6">
                  <div className="w-full max-w-[90%] rounded-lg border bg-background p-4 shadow-lg">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">
                          Machine Learning Quiz
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        12 Participants
                      </div>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg bg-muted p-3">
                        <p className="font-medium">
                          What is the main difference between supervised and
                          unsupervised learning?
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div className="rounded-md border border-blue-200 bg-blue-100 p-2 text-sm">
                          A. Data labeling requirements
                        </div>
                        <div className="rounded-md border p-2 text-sm">
                          B. Processing speed
                        </div>
                        <div className="rounded-md border p-2 text-sm">
                          C. Hardware requirements
                        </div>
                        <div className="rounded-md border p-2 text-sm">
                          D. Programming language used
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          Question 3 of 10
                        </div>
                        <div className="text-sm font-medium">
                          00:45 remaining
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Track Your Progress
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive analytics to monitor quiz performance and
                  participant engagement.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center justify-between rounded-lg border bg-background p-8 shadow-sm">
                <Users className="h-12 w-12 text-blue-500" />
                <div className="mt-4 text-center">
                  <div className="text-4xl font-bold">1,000+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Users
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between rounded-lg border bg-background p-8 shadow-sm">
                <FileQuestion className="h-12 w-12 text-blue-500" />
                <div className="mt-4 text-center">
                  <div className="text-4xl font-bold">5,000+</div>
                  <div className="text-sm text-muted-foreground">
                    Quizzes Created
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between rounded-lg border bg-background p-8 shadow-sm">
                <BarChart3 className="h-12 w-12 text-blue-500" />
                <div className="mt-4 text-center">
                  <div className="text-4xl font-bold">98%</div>
                  <div className="text-sm text-muted-foreground">
                    User Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Get Started Today
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Learning Experience?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of educators and students who are already using
                  QuizPDF.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  Start with our free plan. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileQuestion className="h-6 w-6" />
                <span className="text-lg font-bold">QuizPDF</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transform PDFs into interactive quizzes with AI.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} QuizPDF. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
