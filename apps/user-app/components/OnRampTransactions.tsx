import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No transactions yet</div>
          <div className="text-gray-500 text-sm">
            Your transaction history will appear here
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="space-y-3">
        {transactions.map((t, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 text-sm">₹</span>
                </div>
                <div>
                  <div className="text-gray-200 font-medium">
                    Added ₹{(t.amount / 100).toFixed(2)}
                  </div>
                  <div className="text-gray-400 text-sm">{t.provider}</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs mb-1">
                {t.time.toLocaleDateString()}
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  t.status === "Success"
                    ? "bg-green-500/20 text-green-400"
                    : t.status === "Processing"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                }`}
              >
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
