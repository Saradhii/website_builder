"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bailian } from '@lobehub/icons';
import { ThemeToggle } from "./theme-toggle";
import { Binary } from "@/components/animate-ui/icons/binary";
import { Hammer } from "@/components/animate-ui/icons/hammer";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

export function Navbar() {
  const pathname = usePathname();
  const isDocsPage = pathname.startsWith("/docs");
  const navHref = isDocsPage ? "/" : "/docs";
  const navLabel = isDocsPage ? "BUILD" : "DOCS";
  const NavIcon = isDocsPage ? Hammer : Binary;

  return (
    <header className="relative z-50">
      <div className="max-w-3xl mx-auto px-4 xl:px-0 py-3">
        <div className="bg-transparent flex items-center justify-between gap-x-4 rounded-3xl border border-input/80 py-2.5 pl-5 pr-2.5">
          <div className="flex items-center gap-x-10">
            <Link href="/" title="Home" className="flex items-center gap-2">
              <Bailian.Color className="w-5 h-5 sm:w-7 sm:h-7" />
              <span className="font-bold text-sm sm:text-base tracking-tight text-foreground">
                BLDR
              </span>
            </Link>
            <span className="hidden h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700 lg:block"></span>
          </div>
          <nav className="block">
            <ul className="flex items-center">
              <li>
                <AnimateIcon animateOnHover asChild>
                  <Link
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition hover:text-neutral-600 dark:hover:text-neutral-400"
                    href={navHref}
                  >
                    <NavIcon size={20} />
                    {navLabel}
                  </Link>
                </AnimateIcon>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-x-4">
            <span className="hidden h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700 lg:block"></span>
            <div className="flex items-center">
              <ThemeToggle />
              <button
                type="button"
                aria-label="Open menu"
                className="lg:hidden"
                title="Open menu"
              >
                <svg
                  className="h-6 text-slate-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
