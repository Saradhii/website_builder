import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { BuilderWorkspaceProvider } from "./components/builder-workspace/context";

export const metadata: Metadata = {
  title: "Website Builder",
  description: "A lightweight website builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen w-screen overflow-hidden">
      <body className="antialiased h-screen w-screen overflow-hidden flex flex-col">
        <BuilderWorkspaceProvider>
          <Navbar />
          <main className="flex-1 w-full overflow-hidden">
            {children}
          </main>
        </BuilderWorkspaceProvider>
      </body>
    </html>
  );
}
