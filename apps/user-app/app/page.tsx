"use client";
import { Appbar } from "@repo/ui/appbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <>
      <Appbar
        user={session.data?.user}
        onSignin={signIn}
        onSignout={signOut}
      ></Appbar>
    </>
  );
}
