"use client";
import React, { useState } from "react";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  async function handleSubmit() {
    setError("");
    setLoading(false);
    if (!phoneNumber || !password) {
      setError("Enter your credentials before signing in ");
      return;
    }
    if (password.length < 6) {
      setError("Your password was alteast 6 character long");
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Enter a valid Phone Number");
      return;
    }
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        phone: phoneNumber,
        password: password,
        redirect: false,
      });
      if (result?.error) {
        setError(result.error);
      } else router.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex items-center justify-center h-svh">
      <div className="">
        <Card title="Sign In">
          <div className="w-60 md:w-80 space-y-6 ">
            {error && <div className="text-red-500 my-3">{error}</div>}
            {success && (
              <div className="text-emerald-400 my-3">
                Signup Successful. Please Signin
              </div>
            )}
            <TextInput
              maxLength={10}
              label="Phone Number"
              type="tel"
              placeholder="Enter 10-digit Number"
              onChange={(e) => {
                setPhoneNumber(e);
              }}
            ></TextInput>
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password (min. 6 characters)"
              onChange={(e) => {
                setPassword(e);
              }}
            ></TextInput>
            <div className="flex flex-col justify-center">
              <Button variant="primary" onClick={handleSubmit}>
                {loading ? " Signing in" : "Sign In"}
              </Button>
            </div>

            <p className="my-4 ">
              Don&apos;t have an account ?
              <button
                className="underline hover:cursor-pointer"
                onClick={() => {
                  router.push("/auth/signup");
                }}
              >
                Signup
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
