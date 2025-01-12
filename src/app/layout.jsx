import { Lexend } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/Header";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ['latin']
});

export const metadata = {
  title: "Wist - Minha lista",
  description: "Navegar pela sua lista de desejos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend.className} style={{marginBottom: 10}}>
        <Header />
        {children}
      </body>
    </html>
  );
}
