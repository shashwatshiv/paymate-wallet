"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

const AppbarClient = () => {
  const session = useSession();
  return (
    <Appbar
      user={session.data?.user?.name}
      onSignin={signIn}
      onSignout={signOut}
    ></Appbar>
  );
};
export default AppbarClient;
