import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

export function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [walletId, setWalletId] = useState('');

  const { addTransaction, wallets, categories } = useApp();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !amount || !walletId) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const transactionAmount = parseFloat(amount);
    
    // Validate amount is positive
    if (transactionAmount <= 0) {
      toast({
        title: 'Error',
        description: 'Amount must be greater than 0',
        variant: 'destructive',
      });
      return;
    }

    // Check wallet balance for expense transactions
    if (type === 'expense') {
      const selectedWallet = wallets.find(w => w.id === walletId);
      if (selectedWallet && transactionAmount > selectedWallet.balance) {
        toast({
          title: 'Insufficient Balance',
          description: `Your ${selectedWallet.name} wallet has only ${selectedWallet.balance.toFixed(2)}. Cannot spend ${transactionAmount.toFixed(2)}.`,
          variant: 'destructive',
        });
        return;
      }
    }

    try {
      await addTransaction({
        type,
        category,
        amount: transactionAmount,
        description,
        date,
        walletId,
      });

      toast({
        title: 'Success',
        description: 'Transaction added successfully',
      });

      // Reset form
      setType('expense');
      setCategory('');
      setAmount('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setWalletId('');
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add transaction',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 shadow-lg">
          <Plus size={20} />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Type Toggle */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === 'expense' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setType('expense')}
            >
              Expense
            </Button>
            <Button
              type="button"
              variant={type === 'income' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setType('income')}
            >
              Income
            </Button>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Wallet */}
          <div className="space-y-2">
            <Label htmlFor="wallet">Wallet</Label>
            <Select value={walletId} onValueChange={setWalletId}>
              <SelectTrigger>
                <SelectValue placeholder="Select wallet" />
              </SelectTrigger>
              <SelectContent>
                {wallets.map((wallet) => (
                  <SelectItem key={wallet.id} value={wallet.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{wallet.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ${wallet.balance.toFixed(2)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {walletId && (
              <div className="text-sm text-muted-foreground">
                Current balance: ${
                  wallets.find(w => w.id === walletId)?.balance.toFixed(2) || '0.00'
                }
              </div>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Add Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
