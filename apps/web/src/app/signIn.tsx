"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function SignIn() {
  const { data: session } = useSession();
  return (
    <>
      {session && session.user ? (
        <div>
          {JSON.stringify(session)}
          Logged in as {session.user.name}{" "}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          Not logged in <button onClick={() => signIn()}>Sign In</button>
        </div>
      )}
    </>
  );
}

export default SignIn;
