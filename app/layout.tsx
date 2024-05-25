import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import ReduxProvider from "@/providers/ReduxProvider";
import Head from "next/head";
import NoInternetConnection from "@/components/reusable/NoInternetComponent";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.PRODUCTION_URL || "https://wip.condokharido.ca"
  ),
  title: "Condo Kharido",

  description:
    "Search for new condos, upcoming projects, and browse through insightful podcasts and blogs. Let Sanjay Gupta guide you to your dream home.",

  openGraph: {
    title: "Condo Kharido",
    description:
      "Search for new condos, upcoming projects, and browse through insightful podcasts and blogs. Let Sanjay Gupta guide you to your dream home.",
    images: [
      {
        url: "/assets/opengraph.png",
        width: 800,
        height: 600,
        alt: "Condo Kharido",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon//favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon//favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <body className={`${poppins.variable} `}>
        <NoInternetConnection>
          <ReduxProvider>{children}</ReduxProvider>
        </NoInternetConnection>
      </body>
      <GoogleAnalytics gaId="G-HFHSE0EJPK" />
    </html>
  );
}
