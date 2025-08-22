import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { prisma } from "@repo/db";
import { Card } from "../../../components/Card";

export default async function Transactions() {
  const session = await getServerSession(authOptions);
  async function getTransactions() {
    if (!session?.user?.id) {
      return { onRampTxns: [], p2pTxns: [] };
    }

    try {
      const onRampTxns = await prisma.onRampTransaction.findMany({
        where: {
          userId: Number(session?.user?.id),
        },
        orderBy: {
          startTime: "desc",
        },
      });

      const p2pTxns = await prisma.p2pTransfer.findMany({
        where: {
          OR: [
            { fromUserId: Number(session?.user?.id) },
            { toUserId: Number(session?.user?.id) },
          ],
        },
        include: {
          fromUser: true,
          toUser: true,
        },
        orderBy: {
          timestamp: "desc",
        },
      });

      return { onRampTxns: onRampTxns || [], p2pTxns: p2pTxns || [] };
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return { onRampTxns: [], p2pTxns: [] };
    }
  }

  const { onRampTxns, p2pTxns } = await getTransactions();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">
          Transaction History
        </h1>
        <p className="text-gray-400">View all your payment activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* OnRamp Transactions */}
        <Card title="Money Added">
          <div className="space-y-3">
            {!onRampTxns || onRampTxns.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                No money added yet
              </p>
            ) : (
              onRampTxns.map((txn) => (
                <div
                  key={txn.id}
                  className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-sm">+</span>
                    </div>
                    <div>
                      <div className="text-gray-200 font-medium">
                        Added ₹{(txn.amount / 100).toFixed(2)}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {txn.provider}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-xs mb-1">
                      {txn.startTime.toLocaleDateString()}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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

        {/* P2P Transactions */}
        <Card title="Money Sent/Received">
          <div className="space-y-3">
            {!p2pTxns || p2pTxns.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                No P2P transactions yet
              </p>
            ) : (
              p2pTxns.map((txn) => {
                const isSender = txn.fromUserId === Number(session?.user?.id);
                return (
                  <div
                    key={txn.id}
                    className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isSender ? "bg-red-500/20" : "bg-green-500/20"
                        }`}
                      >
                        <span
                          className={`text-sm ${isSender ? "text-red-400" : "text-green-400"}`}
                        >
                          {isSender ? "-" : "+"}
                        </span>
                      </div>
                      <div>
                        <div className="text-gray-200 font-medium">
                          {isSender ? "Sent" : "Received"} ₹
                          {(txn.amount / 100).toFixed(2)}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {isSender
                            ? `To: ${txn.toUser?.number || "Unknown"}`
                            : `From: ${txn.fromUser?.number || "Unknown"}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-xs">
                        {txn.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
