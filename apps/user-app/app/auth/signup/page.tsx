"use client";
import React, { useState } from "react";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import createUser from "../../lib/actions/createUser";
const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function handleSignup() {
    if (!name || !email || !phoneNumber || !password) {
      setError("All fields are required ");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Enter a valid Phone Number");
      return;
    }
    if (password.length < 6) {
      setError("Password must be atleast 6 characters");
      return;
    }
    setError("");
    const response = await createUser(name, email, phoneNumber, password);
    if ("error" in response && response.error) {
      //    setError("Signup failed. Please check your details and try again.");
      setError(response.error.toString());
    } else {
      router.push("/auth/signin?success=1");
    }
  }
  return (
    <div className="flex items-center justify-center h-svh">
      <div className="">
        <Card title="Sign Up">
          <div className="w-60 md:w-80 space-y-4">
            <TextInput
              label="Name"
              type="string"
              placeholder="Enter your Full Name"
              onChange={(e) => {
                setName(e);
              }}
            ></TextInput>
            <TextInput
              label="Email"
              type="string"
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e);
              }}
            ></TextInput>
            <TextInput
              label="Phone Number"
              type="string"
              maxLength={10}
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
            <div className="flex flex-col  justify-center">
              <Button variant="primary" onClick={handleSignup}>
                Sign Up
              </Button>
              {error && <div className="text-red-500 mt-3"> {error}</div>}
              <p className="my-4 ">
                Already have an Account ?{" "}
                <button
                  className="underline hover:cursor-pointer"
                  onClick={() => {
                    router.push("/auth/signin");
                  }}
                >
                  Signin
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
