import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "./components/theme-toggle";
import { BuilderWorkspaceProvider } from "./components/builder-workspace/context";
import { ThemeScript, ThemeProviderInner } from "./components/theme-provider";

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
    <html lang="en" className="h-screen w-screen overflow-hidden" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased h-screen w-screen overflow-hidden flex flex-col">
        <ThemeProviderInner>
          <BuilderWorkspaceProvider>
            <header className="flex justify-end p-4 relative z-50">
              <ThemeToggle />
            </header>
            <main className="flex-1 w-full overflow-hidden">
              {children}
            </main>
          </BuilderWorkspaceProvider>
        </ThemeProviderInner>
      </body>
    </html>
  );
}
