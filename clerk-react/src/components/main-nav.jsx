import { cn } from "@/lib/utils";
import { Package2Icon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";

export function MainNav() {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6")}>
      <div className="flex h-[60px] items-center px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">Super App</span>
        </Link>
      </div>
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Applications
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search applications..."
              type="search"
            />
          </div>
        </form>
      </div>
    </nav>
  );
}
