import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { SessionProvider } from "./SessionProvider";
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo Application",
  description: "Eine einfache ToDo Verwaltung als Web Applikation.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="de">
      <body className={`inter.className bg-[#181818]`}>
      <SessionProvider session={session}>
        {children}
        </SessionProvider>
        </body>
    </html>
  );
}
