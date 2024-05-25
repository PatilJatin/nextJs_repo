import AuthProvider from "@/providers/AuthProvider";
import { Poppins } from "next/font/google";
import "./adminpanel.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${poppins.variable} bg-primaryBackground`}>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </main>
  );
}
