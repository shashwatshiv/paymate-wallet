"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import p2ptransaction from "../app/lib/actions/p2pTxn";

const SendMoneyCard = () => {
  const [amount, setAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="flex justify-center">
      <Center>
        <Card title="Send Money">
          <div className="w-72">
            <TextInput
              label="Phone Number"
              type="number"
              placeholder="92XXXXXXXX"
              onChange={(e) => {
                setPhoneNumber(e);
              }}
            ></TextInput>
            <TextInput
              label="Amount"
              type="number"
              placeholder="₹"
              onChange={(e) => {
                setAmount(Number(e) * 100);
              }}
            ></TextInput>
            <Center>
              <div className="p-4">
                <Button
                  onClick={() => {
                    p2ptransaction(phoneNumber, amount);
                  }}
                >
                  Send
                </Button>
              </div>
            </Center>
          </div>
        </Card>
      </Center>
    </div>
  );
};

export default SendMoneyCard;
