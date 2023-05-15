import SignIn from "./signIn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>
          Server side:{" "}
          {session && session.user ? JSON.stringify(session) : null}
        </p>
        <p>Client side:</p>
        <SignIn />
      </div>
    </main>
  );
}
