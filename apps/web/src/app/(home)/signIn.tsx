"use client";

import { notifications } from "@mantine/notifications";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@mantine/core";

function SignIn() {
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <Button
        onClick={() => {
          notifications.show({
            title: "Test notification",
            message: "This is testing notification",
          });
        }}
      >
        Button
      </Button>

      <Button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme}
      </Button>

      {session && session.user ? (
        <div>
          {JSON.stringify(session)}
          Logged in as {session.user.name}{" "}
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div>
          Not logged in <Button onClick={() => signIn()}>Sign In</Button>
        </div>
      )}
    </div>
  );
}

export default SignIn;
