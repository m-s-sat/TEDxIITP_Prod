import type { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import "./globals.css";
import { Bebas_Neue, Cormorant, Space_Grotesk, Inter, Source_Sans_3, Albert_Sans, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const lemonMilk = localFont({
  src: [
    {
      path: "./font/LEMONMILK-Regular.otf",
      weight: "400",
    },
  ],
  variable: "--font-lemon",
});

const molend = localFont({
  src: "./font/MolendRegular-rgnBx.otf",
  variable: "--font-molend",
});

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


interface Props {
  readonly children: ReactNode;
}


const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
});

const spaceGrotesk = Space_Grotesk({
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700"
  ],
  subsets: ['latin'],
  variable: '--font-space',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});


const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
});

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-albert-sans",
});

export default function RootLayout({ children }: Props) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={cn(
        bebasNeue.variable, 
        cormorant.variable, 
        spaceGrotesk.variable, 
        inter.variable,       // Fix: added .variable
        molend.variable,      // This now registers properly
        sourceSans.variable,  // Fix: added .variable
        albertSans.variable,  // Fix: added .variable
        geist.variable, 
        lemonMilk.variable
      )}
    >
      <body suppressHydrationWarning className={`bg-[#0a0a0a] bg-[url('/bg1.png')] bg-repeat bg-top bg-left text-white min-h-screen flex flex-col`}>
        <NextTopLoader color="#DC2626" height={3} showSpinner={false} shadow="0 0 10px #DC2626,0 0 5px #DC2626" />
        {/* Navigation Bar */}
        <Navbar />
        {/* Page Content */}
        <main className="flex-1 w-full px-2 sm:px-6 pb-8 pt-4">
          {children}
        </main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}