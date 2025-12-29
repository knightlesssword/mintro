import { useState } from 'react';
import { Plus, Trash2, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { AddFundsModal } from '@/components/AddFundsModal';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export default function Savings() {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, updateWallet, userProfile, wallets } = useApp();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [savingsType, setSavingsType] = useState<'individual' | 'linked'>('individual');
  const [linkedWalletId, setLinkedWalletId] = useState('');
  const [goalToDelete, setGoalToDelete] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency || 'USD',
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !goalAmount || !targetDate) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Validate that target date is not in the past
    const selectedDate = new Date(targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    
    if (selectedDate < today) {
      toast({
        title: 'Invalid Date',
        description: 'Target date cannot be in the past. Please select today or a future date.',
        variant: 'destructive',
      });
      return;
    }

    if (savingsType === 'linked' && !linkedWalletId) {
      toast({
        title: 'Error',
        description: 'Please select a wallet to link for linked savings',
        variant: 'destructive',
      });
      return;
    }

    addSavingsGoal({
      name,
      description,
      goalAmount: parseFloat(goalAmount),
      currentAmount: 0,
      targetDate,
      savingsType,
      linkedWalletId: savingsType === 'linked' ? linkedWalletId : undefined,
    });

    toast({
      title: 'Success',
      description: 'Savings goal created successfully',
    });

    setName('');
    setDescription('');
    setGoalAmount('');
    setTargetDate('');
    setSavingsType('individual');
    setLinkedWalletId('');
    setOpen(false);
  };

  const handleAddContribution = async (goalId: string, amount: number) => {
    // Find the current goal to get the existing amount
    const currentGoal = savingsGoals.find(g => g.id === goalId);
    if (!currentGoal) {
      toast({
        title: 'Error',
        description: 'Savings goal not found',
        variant: 'destructive',
      });
      return;
    }

    // For linked savings, check wallet balance FIRST before updating anything
    if (currentGoal.savingsType === 'linked' && currentGoal.linkedWalletId) {
      const linkedWallet = wallets.find(w => 
        w.id === currentGoal.linkedWalletId || 
        w.id === String(currentGoal.linkedWalletId) ||
        Number(w.id) === Number(currentGoal.linkedWalletId)
      );
      
      if (linkedWallet) {
        if (linkedWallet.balance < amount) {
          toast({
            title: 'Insufficient Balance',
            description: `Not enough balance in ${linkedWallet.name}. Available: ${formatCurrency(linkedWallet.balance)}`,
            variant: 'destructive',
          });
          return; // Stop here, don't update anything
        }
        
        // Update the wallet balance by subtracting the amount
        const walletUpdateSuccess = await updateWallet(linkedWallet.id, {
          balance: linkedWallet.balance - amount
        });
        
        if (!walletUpdateSuccess) {
          toast({
            title: 'Error',
            description: `Failed to deduct amount from ${linkedWallet.name}. Please try again.`,
            variant: 'destructive',
          });
          return;
        }
        
        // Add the contribution to the existing amount
        const newAmount = currentGoal.currentAmount + amount;
        updateSavingsGoal(goalId, {
          currentAmount: newAmount,
        });
        
        toast({
          title: 'Success',
          description: `Contribution of ${formatCurrency(amount)} transferred from ${linkedWallet.name}`,
        });
      }
    } else {
      // For individual savings, just update the savings goal
      const newAmount = currentGoal.currentAmount + amount;
      updateSavingsGoal(goalId, {
        currentAmount: newAmount,
      });
      
      toast({
        title: 'Success',
        description: `Contribution of ${formatCurrency(amount)} added successfully`,
      });
    }
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoalToDelete(goalId);
  };

  const confirmDeleteGoal = () => {
    if (goalToDelete) {
      try {
        deleteSavingsGoal(goalToDelete);
        toast({
          title: 'Savings Goal Deleted',
          description: 'The savings goal has been successfully deleted',
        });
      } catch (error) {
        toast({
          title: 'Delete Failed',
          description: error instanceof Error ? error.message : 'Failed to delete savings goal',
          variant: 'destructive',
        });
      } finally {
        setGoalToDelete(null);
      }
    }
  };

  const cancelDeleteGoal = () => {
    setGoalToDelete(null);
  };

  const getLinkedWalletName = (linkedWalletId: string | undefined) => {
    if (!linkedWalletId) return 'Unknown Wallet';
    
    // Try multiple comparison methods to handle type mismatches
    const wallet = wallets.find(w => 
      w.id === linkedWalletId || 
      w.id === String(linkedWalletId) ||
      Number(w.id) === Number(linkedWalletId)
    );
    
    return wallet?.name || 'Unknown Wallet';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Savings Goals</h1>
          <p className="text-muted-foreground">Track your savings progress</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={20} />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Savings Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Emergency Fund"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What are you saving for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="savingsType">Savings Type</Label>
                <Select value={savingsType} onValueChange={(value: 'individual' | 'linked') => setSavingsType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select savings type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual Savings</SelectItem>
                    <SelectItem value="linked">Linked Savings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {savingsType === 'linked' && (
                <div className="space-y-2">
                  <Label htmlFor="linkedWallet">Linked Wallet</Label>
                  <Select value={linkedWalletId} onValueChange={setLinkedWalletId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wallet to link" />
                    </SelectTrigger>
                    <SelectContent>
                      {wallets.map((wallet) => (
                        <SelectItem key={wallet.id} value={wallet.id}>
                          {wallet.name} ({formatCurrency(wallet.balance)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="goalAmount">Goal Amount</Label>
                <Input
                  id="goalAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Create Goal
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.goalAmount) * 100;
          const daysLeft = Math.ceil(
            (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <Card key={goal.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${
                      goal.currentAmount >= goal.goalAmount 
                        ? 'bg-green-100' 
                        : 'bg-primary/10'
                    }`}>
                      <Target className={`h-5 w-5 ${
                        goal.currentAmount >= goal.goalAmount 
                          ? 'text-green-600' 
                          : 'text-primary'
                      }`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{goal.name}</CardTitle>
                      {goal.currentAmount >= goal.goalAmount && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Savings Goal</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{goal.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={cancelDeleteGoal}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteGoal} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Goal
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{goal.description}</p>
                
                {goal.savingsType === 'individual' && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Individual Savings
                    </span>
                  </div>
                )}

                {goal.savingsType === 'linked' && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Linked Savings
                    </span>
                    <span>•</span>
                    <span>Linked to: {getLinkedWalletName(goal.linkedWalletId)}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    {(() => {
                      const totalAmount = goal.currentAmount;
                      const goalRatio = goal.goalAmount / totalAmount;
                      
                      // If amount is 2x or more, keep purple at 10%
                      const purpleWidth = totalAmount >= goal.goalAmount * 2 ? 5 : (goalRatio * 100);
                      const greenWidth = 100 - purpleWidth;
                      
                      return (
                        <>
                          {/* Purple - goal amount ratio */}
                          <div 
                            className="absolute top-0 left-0 h-full bg-purple-500 transition-all duration-300"
                            style={{ width: `${purpleWidth}%` }}
                          />
                          {/* Green - surplus amount ratio */}
                          <div 
                            className="absolute top-0 h-full bg-green-500 transition-all duration-300"
                            style={{ 
                              width: `${greenWidth}%`,
                              left: `${purpleWidth}%`
                            }}
                          />
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-primary">
                      {formatCurrency(goal.currentAmount)}
                    </span>
                    <span className="text-muted-foreground">
                      of {formatCurrency(goal.goalAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                  </span>
                  <AddFundsModal
                    goalId={goal.id}
                    currentAmount={goal.currentAmount}
                    onAddContribution={handleAddContribution}
                    linkedWalletName={goal.savingsType === 'linked' ? getLinkedWalletName(goal.linkedWalletId) : undefined}
                    linkedWalletBalance={goal.savingsType === 'linked' ? wallets.find(w => w.id === goal.linkedWalletId || w.id === String(goal.linkedWalletId) || Number(w.id) === Number(goal.linkedWalletId))?.balance : undefined}
                    isLinked={goal.savingsType === 'linked'}
                  >
                    <Button 
                      size="sm" 
                      variant={goal.currentAmount >= goal.goalAmount ? "default" : "outline"}
                      className={goal.currentAmount >= goal.goalAmount ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                    >
                      {goal.currentAmount >= goal.goalAmount ? 'Add Surplus Funds' : 'Add Funds'}
                    </Button>
                  </AddFundsModal>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {savingsGoals.length === 0 && (
        <Card className="p-12 text-center">
          <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No savings goals yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first savings goal to start tracking your progress
          </p>
          <Button onClick={() => setOpen(true)}>
            <Plus size={20} className="mr-2" />
            Create Goal
          </Button>
        </Card>
      )}
    </div>
  );
}

