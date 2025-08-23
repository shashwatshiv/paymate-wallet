import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { prisma } from "@repo/db";
import { Card } from "@repo/ui/card";
import QuickActions from "../../../components/QuickActions";

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

async function getRecentTransactions() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  try {
    const txns = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
      take: 5,
      orderBy: {
        startTime: "desc",
      },
    });
    return txns || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export default async function Dashboard() {
  const balance = await getBalance();
  const transactions = await getRecentTransactions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">
          Welcome to PayMate
        </h1>
        <p className="text-gray-400">Manage your digital payments with ease</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Available Balance" className="text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            ₹{(balance.amount / 100).toFixed(2)}
          </div>
          <p className="text-gray-400 text-sm">Ready to spend</p>
        </Card>

        <Card title="Locked Balance" className="text-center">
          <div className="text-3xl font-bold text-gray-400 mb-2">
            ₹{(balance.locked / 100).toFixed(2)}
          </div>
          <p className="text-gray-400 text-sm">In processing</p>
        </Card>

        <Card title="Total Balance" className="text-center">
          <div className="text-3xl font-bold text-white mb-2">
            ₹{((balance.amount + balance.locked) / 100).toFixed(2)}
          </div>
          <p className="text-gray-400 text-sm">Total funds</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Quick Actions">
          <QuickActions></QuickActions>
        </Card>

        <Card title="Recent Activity">
          <div className="space-y-3">
            {!transactions || transactions.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                No recent transactions
              </p>
            ) : (
              transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg"
                >
                  <div>
                    <p className="text-gray-200 font-medium">
                      Added ₹{(txn.amount / 100).toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-sm">{txn.provider}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        txn.status === "Success"
                          ? "bg-green-500/20 text-green-400"
                          : txn.status === "Processing"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
