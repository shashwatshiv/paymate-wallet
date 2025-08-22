import { prisma } from "@repo/db";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      amount: 0,
      locked: 0,
    };
  }

  try {
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    };
  } catch (error) {
    console.error("Error fetching balance:", error);
    return {
      amount: 0,
      locked: 0,
    };
  }
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  try {
    const txns = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    return (txns || []).map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export default async function Transfer() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Add Money</h1>
        <p className="text-gray-400">Add funds to your PayMate wallet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <AddMoney />
        </div>
        <div className="space-y-6">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
