import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AddFundsModalProps {
  goalId: string;
  currentAmount: number;
  onAddContribution: (goalId: string, amount: number) => void;
  children: React.ReactNode;
  linkedWalletName?: string;
  linkedWalletBalance?: number;
  isLinked?: boolean;
}

export function AddFundsModal({ goalId, currentAmount, onAddContribution, children, linkedWalletName, linkedWalletBalance, isLinked }: AddFundsModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid amount',
        variant: 'destructive',
      });
      return;
    }

    const contributionAmount = parseFloat(amount);
    onAddContribution(goalId, contributionAmount);

    setAmount('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Funds to Goal</DialogTitle>
          {isLinked && linkedWalletName && (
            <p className="text-sm text-muted-foreground" id="wallet-source">
              From: {linkedWalletName}
              {linkedWalletBalance !== undefined && (
                <span className="ml-2">⋅ Available: {linkedWalletBalance.toFixed(2)}</span>
              )}
            </p>
          )}
        </DialogHeader>
        <div id="add-funds-description">
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Contribution Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Current balance: {currentAmount.toFixed(2)}
          </div>
          <div className="flex gap-2 justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Contribution
            </Button>
          </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}