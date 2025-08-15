"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";

export default async function p2ptransaction(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const sender = session.user.id;

  const reciever = await prisma.user.findUnique({
    where: {
      number: to,
    },
  });

  if (!reciever) {
    return {
      Messege: "Reciever doesnt exist",
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender)} FOR UPDATE`;
    const senderBalance = await tx.balance.findFirst({
      where: {
        userId: Number(sender),
      },
    });

    if (!senderBalance || senderBalance.amount < amount) {
      throw new Error("Insufficient Balance");
    }
    await tx.balance.update({
      where: {
        userId: Number(sender),
      },
      data: {
        amount: { decrement: amount },
      },
    });
    await tx.balance.update({
      where: {
        userId: reciever.id,
      },
      data: {
        amount: { increment: amount },
      },
    });
    await tx.p2pTransfer.create({
      data: {
        amount: amount,
        timestamp: new Date(),
        fromUserId: Number(sender),
        toUserId: reciever.id,
      },
    });
  });
}
