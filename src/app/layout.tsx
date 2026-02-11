import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "デジタル・レガシー | 書かずに残す、あなたの人生",
  description:
    "電話で話すだけで、AIがあなたの自分史を書籍PDFとして作成します。大切な人生の記録を、やさしい言葉で残しませんか。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
