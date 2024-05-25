import Footer from "@/components/Footer/Footer";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`  mx-auto bg-white`}>
      <Navbar />
      <div className=" mx-auto">
        {children}
        <Footer />
      </div>
    </main>
  );
}
