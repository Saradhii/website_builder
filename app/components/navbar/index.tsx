import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <nav className="h-16 border-b bg-background relative z-50">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <Button variant="outline">
          Sign In
        </Button>
      </div>
    </nav>
  );
};
