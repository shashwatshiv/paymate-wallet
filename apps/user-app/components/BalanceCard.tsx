import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title="Wallet Balance">
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
          <div>
            <div className="text-gray-300 text-sm">Available Balance</div>
            <div className="text-blue-400 font-semibold">
              ₹{(amount / 100).toFixed(2)}
            </div>
          </div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
          <div>
            <div className="text-gray-300 text-sm">Locked Balance</div>
            <div className="text-gray-400 font-semibold">
              ₹{(locked / 100).toFixed(2)}
            </div>
          </div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>

        <div className="flex justify-between items-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div>
            <div className="text-gray-300 text-sm">Total Balance</div>
            <div className="text-white font-bold text-lg">
              ₹{((locked + amount) / 100).toFixed(2)}
            </div>
          </div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
        </div>
      </div>
    </Card>
  );
};
