import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface PoolCardProps {
  name: string;
  description: string;
  target: number;
  current: number;
  recipient: string;
  onContribute: (amount: number) => void;
}

const PoolCard = ({ name, description, target, current, recipient, onContribute }: PoolCardProps) => {
  const [amount, setAmount] = useState("");
  const progress = (current / target) * 100;

  const handleContribute = () => {
    const contributionAmount = parseFloat(amount);
    if (contributionAmount > 0) {
      onContribute(contributionAmount);
      setAmount("");
    }
  };

  return (
    <Card className="w-full p-6 space-y-6 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Save for {name}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">
            {current.toFixed(4)} / {target} RBTC
          </span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="text-right text-sm text-muted-foreground">
          {progress.toFixed(1)}% funded
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="number"
            step="0.0001"
            placeholder="Amount in RBTC"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleContribute}
            className="bg-primary text-primary-foreground hover:scale-105 transition-smooth"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Contribute
          </Button>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="text-sm space-y-1">
          <span className="text-muted-foreground">Recipient:</span>
          <p className="font-mono text-xs break-all text-foreground">{recipient}</p>
        </div>
      </div>
    </Card>
  );
};

export default PoolCard;
