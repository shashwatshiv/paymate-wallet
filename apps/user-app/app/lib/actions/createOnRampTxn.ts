"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function createOnRampTxn(
  amount: number,
  provider: string,
) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  if (!userId) {
    return {
      messege: "Invalid User",
    };
  }
  const captured = await prisma.onRampTransaction.create({
    data: {
      amount: amount,
      provider: provider,
      userId: Number(userId),
      status: "Processing",
      token: (Math.random() * 1000).toString(),
      startTime: new Date(),
    },
  });
  if (captured) {
    return {
      messege: "Transaction Started",
    };
  }
}
