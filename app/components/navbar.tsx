"use client";

import Link from "next/link";
import { Bailian } from '@lobehub/icons';
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="relative z-50">
      <div className="max-w-4xl mx-auto px-4 xl:px-0 py-3">
        <div className="bg-white dark:bg-card flex items-center justify-between gap-x-4 rounded-2xl py-2.5 pl-5 pr-2.5 shadow-[0_2px_10px_0px_rgba(0,0,0,0.15)] lg:rounded-[1.375rem]">
          <div className="flex items-center gap-x-10">
            <Link href="/" title="Home" className="flex items-center gap-2">
              <Bailian.Color className="w-5 h-5 sm:w-7 sm:h-7" />
              <span className="font-bold text-sm sm:text-base tracking-tight text-foreground">
                BLDR
              </span>
            </Link>
            <span className="hidden h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700 lg:block"></span>
          </div>
          <nav className="hidden lg:block">
            <ul className="flex items-center">
              <li>
                <Link
                  className="px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition hover:text-neutral-600 dark:hover:text-neutral-400"
                  href="/docs"
                >
                  DOCS
                </Link>
              </li>
              <li>
                <Link
                  className="px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition hover:text-neutral-600 dark:hover:text-neutral-400"
                  href="/byom"
                >
                  BYOM
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-x-4 lg:gap-x-10">
            <span className="hidden h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700 lg:block"></span>
            <div className="flex items-center gap-x-3 lg:gap-x-2">
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
