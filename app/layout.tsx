import { Inter } from "next/font/google";
import "./globals.css";
import Warnings from "./components/warnings";
import { assistantId } from "./assistant-config";
import Navbar from "./components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Assistants Workspace",
  description: "Modern workspace for assistants, tools, and knowledge",
  icons: {
    icon: "/openai.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#0b0f1a] text-slate-100`}
      >
        <Navbar />
        {assistantId ? children : <Warnings />}
      </body>
    </html>
  );
}
