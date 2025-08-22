import React from "react";
import SendMoneyCard from "../../../components/SendMoneyCard";

const P2P = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Send Money</h1>
        <p className="text-gray-400">
          Transfer money to friends and family instantly
        </p>
      </div>

      <div className="flex justify-center pt-8">
        <SendMoneyCard />
      </div>
    </div>
  );
};

export default P2P;
