import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { BuilderWorkspaceProvider } from "./components/builder-workspace/context";
import { ThemeScript, ThemeProviderInner } from "./components/theme-provider";
import { WavyBackground } from "@/components/ui/wavy-background";

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
            <WavyBackground
              waveOpacity={0.5}
              blur={10}
              speed="fast"
              containerClassName="h-full w-full flex flex-col"
              className="h-full w-full flex flex-col"
            >
              <div className="flex-shrink-0 relative z-50">
                <Navbar />
              </div>
              <main className="flex-1 w-full overflow-hidden min-h-0 relative z-0">
                {children}
              </main>
            </WavyBackground>
          </BuilderWorkspaceProvider>
        </ThemeProviderInner>
      </body>
    </html>
  );
}
