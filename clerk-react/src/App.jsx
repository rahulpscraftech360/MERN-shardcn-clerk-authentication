import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full flex flex-col ">
        <div className="w-1/2 "></div>
        <div className="w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              {" "}
              <SignedOut>
                <SignInButton />
                <p>
                  This content is public. Only signed out users can see this.
                </p>
              </SignedOut>
              <SignedIn>
                <SignOutButton afterSignOutUrl="/" />
                <UserButton />
                <p>
                  This content is private. Only signed in users can see this.
                </p>
              </SignedIn>
              {/* <p>Card Content</p> */}
            </CardContent>
            <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
          </Card>{" "}
        </div>
      </div>
    </>
  );
}

export default App;
