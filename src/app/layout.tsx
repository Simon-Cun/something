import "./globals.css";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { ReactQueryClientProvider } from "@/utils/react-query";
import Navbar from "@/components/Navbar";
import Stars from "@/components/Stars";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm_sans",
});

export const metadata = {
  title: "Simon Cun",
  description:
    "I hope you learn a lot about me through my portfolio website! :D",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${dm_sans.variable} ${playfair.variable}`}>
      <body className="font-dm_sans relative overflow-x-hidden bg-black text-lg text-white">
        <Stars />
        <Navbar />
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}
