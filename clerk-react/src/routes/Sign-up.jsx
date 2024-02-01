import { RedirectToSignIn, SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <>
      {" "}
      <SignUp
        appearance={{
          baseTheme: dark,
        }}
      />
      <RedirectToSignIn />
    </>
  );
}
