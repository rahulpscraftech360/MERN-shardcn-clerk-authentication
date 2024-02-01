// SignInPage.js
import { SignIn, useSession } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

export default function SignInPage() {
  const { session } = useSession();

  useEffect(() => {
    console.log("hereeeee");
    if (session) {
      const sessionId = session.id;

      // Send the session ID to your backend
      axios
        .post("http://localhost:3001/store-user", {
          body: JSON.stringify({ sessionId }),
        })
        .then((response) => {
          // Handle response
        })
        .catch((error) => {
          // Handle error
        });
    }
  }, [session]);

  return <SignIn />;
}
