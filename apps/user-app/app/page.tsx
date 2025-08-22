import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session + " page ");
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div>Hello</div>{" "}
    </>
  );
}
