import { Header } from "@/components";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Motorista Expert",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className + " h-screen"}>
        <Header />
        <div className="h-[calc(100%_-_5rem)]">{children}</div>
      </body>
    </html>
  );
}
