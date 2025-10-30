import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface CreatePoolFormProps {
  onCreatePool: (pool: {
    name: string;
    description: string;
    target: number;
    recipient: string;
  }) => void;
}

const CreatePoolForm = ({ onCreatePool }: CreatePoolFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    target: "",
    recipient: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.target && formData.recipient) {
      onCreatePool({
        name: formData.name,
        description: formData.description,
        target: parseFloat(formData.target),
        recipient: formData.recipient,
      });
    }
  };

  const isValid =
    formData.name &&
    formData.target &&
    parseFloat(formData.target) > 0 &&
    formData.recipient.startsWith("0x") &&
    formData.recipient.length === 42;

  return (
    <Card className="w-full p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Create New Pool</h2>
          <p className="text-sm text-muted-foreground">
            Set up a new savings pool for your goal
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Pool Name</Label>
            <Input
              id="name"
              placeholder="e.g., Emergency Fund"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What are you saving for?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Target Amount (RBTC)</Label>
            <Input
              id="target"
              type="number"
              step="0.0001"
              placeholder="0.1"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              className="font-mono text-sm"
              required
            />
            {formData.recipient && !formData.recipient.startsWith("0x") && (
              <p className="text-xs text-destructive">Address must start with 0x</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:scale-105 transition-smooth"
          disabled={!isValid}
        >
          Create Pool
        </Button>
      </form>
    </Card>
  );
};

export default CreatePoolForm;
