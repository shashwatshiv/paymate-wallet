"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import p2ptransaction from "../app/lib/actions/p2pTxn";

const SendMoneyCard = () => {
  const [amount, setAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMoney = async () => {
    if (!phoneNumber || !amount) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await p2ptransaction(phoneNumber, amount);
      alert("Money sent successfully!");
      setPhoneNumber("");
      setAmount(0);
    } catch (error) {
      alert("Failed to send money. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Send Money">
      <div className="w-80 space-y-6">
        <TextInput
          label="Phone Number"
          type="tel"
          placeholder="Enter 10-digit number"
          onChange={(e) => {
            setPhoneNumber(e);
          }}
        />

        <TextInput
          label="Amount (₹)"
          type="number"
          placeholder="Enter amount"
          onChange={(e) => {
            setAmount(Number(e) * 100);
          }}
        />

        <div className="pt-4">
          <Button
            onClick={handleSendMoney}
            className="w-full"
            size="lg"
          
          >
            {isLoading ? "Sending..." : "Send Money"}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Send money instantly to any PayMate user
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SendMoneyCard;
