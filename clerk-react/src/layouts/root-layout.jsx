import { Toaster } from "@/components/ui/toaster";
import { MainNav } from "@/components/main-nav";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      navigate={navigate}
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary:
            "bg-slate-500 hover:bg-slate-400 text-sm normal-case",
        },
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <header className="header">
          <div className="flex w-full justify-between p-2">
            <div className=" flex  ">
              <MainNav />
            </div>
            <div className="flex ">
              <SignedIn>
                <UserButton afterSignOutUrl="/sign-in" />
              </SignedIn>
              <SignedOut className="">
                <Link to="/sign-in">Sign In</Link>
              </SignedOut>
              <ModeToggle className="" />
            </div>
          </div>
        </header>
        <main className=" h-[10px] items-center border-b px-6">
          <Outlet />
          <Toaster />
        </main>{" "}
      </ThemeProvider>
    </ClerkProvider>
  );
}
