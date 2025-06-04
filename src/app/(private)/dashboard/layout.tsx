import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = true;
  return (
    <div className="">
      <Navbar isLoggedIn={isLoggedIn} showLinks={false} />
      {children}
      <Footer />
    </div>
  );
}
