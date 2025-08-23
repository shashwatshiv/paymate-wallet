"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import createOnRampTxn from "../app/lib/actions/createOnRampTxn";

const SUPPORTED_BANKS: SupportedBankType[] = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

interface SupportedBankType {
  name: string;
  redirectUrl: string;
}

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl,
  );
  const [providerBank, setProviderBank] = useState(
    SUPPORTED_BANKS[0]?.name || "",
  );
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  async function handleAddMoney() {
    if (!amount || !providerBank) {
      setError("All fields are neccessary");
      return;
    }
    if (amount < 10000) {
      setError("Min. Amount allowed is ₹100");
      return;
    } else {
      await createOnRampTxn(amount, providerBank);
      window.location.href = redirectUrl || "";
    }
  }
  return (
    <Card title="Add Money to Wallet">
      <div className="space-y-6">
        {error && <div className="text-red-500 my-2">{error} </div>}
        <TextInput
          label="Amount (₹)"
          placeholder="Enter amount"
          type="number"
          onChange={(e) => {
            setAmount(Number(e) * 100);
          }}
        />

        <Select
          label="Select Bank"
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || "",
            );
            setProviderBank(value);
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />

        <div className="pt-4">
          <Button onClick={handleAddMoney} className="w-full" size="lg">
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
