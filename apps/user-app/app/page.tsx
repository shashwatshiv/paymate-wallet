import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "./lib/auth";
import { Card } from "@repo/ui/card";
import CTA from "../components/CTA";
import WalletIcon from "@repo/ui/WalletIcon";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-3 mb-8">
              <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center">
                <WalletIcon width={40} height={40}></WalletIcon>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-gradient">
                PayMate
              </h1>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-200 mb-4">
              Digital Payments Made Simple
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Experience seamless, secure, and lightning-fast digital payments.
              Send money to friends, add funds to your wallet, and manage your
              finances with ease.
            </p>
          </div>

          {/* CTA Buttons */}

          <CTA></CTA>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gradient mb-12">
            Why Choose PayMate?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card title="Lightning Fast" className="text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Instant transfers and real-time updates. No waiting, no
                  delays.
                </p>
              </div>
            </Card>

            <Card title="Bank-Level Security" className="text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Your money is protected with enterprise-grade encryption and
                  security protocols.
                </p>
              </div>
            </Card>

            <Card title="Easy to Use" className="text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Intuitive interface designed for everyone. No complex setup
                  required.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">10M+</div>
              <div className="text-gray-400">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                ₹500Cr+
              </div>
              <div className="text-gray-400">Transactions Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
