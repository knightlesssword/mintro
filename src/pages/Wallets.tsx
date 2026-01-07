import { useState } from 'react';
import { Plus, Trash2, Wallet as WalletIcon, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useApp, Wallet } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import {
  ALL_WALLET_TYPES,
  getWalletCategories,
  getWalletTypeByName,
  getWalletTypesByCategory,
  IconMap
} from '@/utils/walletTypes';
import { TransferModal } from '@/components/TransferModal';

// const walletColors = [
//   'hsl(270, 60%, 60%)',
//   'hsl(142, 76%, 36%)',
//   'hsl(38, 92%, 50%)',
//   'hsl(0, 84%, 60%)',
//   'hsl(200, 80%, 50%)',
//   'hsl(320, 70%, 55%)',
// ];

const walletColors = [
  '#9947E5',
  '#16A249',
  '#F59F0A',
  '#CC3333',
  '#19A1E6',
  '#DD3CA7',
];

export default function Wallets() {
  const { wallets, addWallet, deleteWallet, transferBalance, userProfile } = useApp();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<Wallet['type']>('cash');
  const [balance, setBalance] = useState('');
  const [color, setColor] = useState(walletColors[0]);
  const [selectedWalletType, setSelectedWalletType] = useState(ALL_WALLET_TYPES[0]);
  const [walletToDelete, setWalletToDelete] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: userProfile.currency || 'USD',
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !balance) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    addWallet({
      name,
      type: selectedWalletType.name as Wallet['type'],
      balance: parseFloat(balance),
      color: color, // Use the selected color from the color picker
      icon_color: color, // Use the selected color as icon color
    });

    toast({
      title: 'Success',
      description: 'Wallet added successfully',
    });

    setName('');
    setType('cash');
    setBalance('');
    setColor(walletColors[0]);
    setSelectedWalletType(ALL_WALLET_TYPES[0]);
    setOpen(false);
  };

  const handleTransfer = (fromWalletId: string, toWalletId: string, amount: number, description: string) => {
    try {
      transferBalance(fromWalletId, toWalletId, amount, description);
      toast({
        title: 'Transfer Successful',
        description: `Transferred ${formatCurrency(amount)} between wallets`,
      });
    } catch (error) {
      toast({
        title: 'Transfer Failed',
        description: error instanceof Error ? error.message : 'Transfer failed',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteWallet = (walletId: string) => {
    setWalletToDelete(walletId);
  };

  const confirmDeleteWallet = () => {
    if (walletToDelete) {
      try {
        deleteWallet(walletToDelete);
        toast({
          title: 'Wallet Deleted',
          description: 'The wallet has been successfully deleted',
        });
      } catch (error) {
        toast({
          title: 'Delete Failed',
          description: error instanceof Error ? error.message : 'Failed to delete wallet',
          variant: 'destructive',
        });
      } finally {
        setWalletToDelete(null);
      }
    }
  };

  const cancelDeleteWallet = () => {
    setWalletToDelete(null);
  };

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);

  const getWalletIcon = (walletType: Wallet['type']) => {
    const walletTypeOption = ALL_WALLET_TYPES.find(t => t.name === walletType);
    if (!walletTypeOption) return WalletIcon;
    const IconComponent = IconMap[walletTypeOption.icon] || WalletIcon;
    return IconComponent;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Wallets</h1>
          <p className="text-muted-foreground">Manage your money sources</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setTransferOpen(true)}
            disabled={wallets.length < 2}
            className="gap-2"
          >
            <ArrowLeftRight size={20} />
            Transfer Balance
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={20} />
                Add Wallet
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Add New Wallet</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side - Form Fields */}
                <div className="space-y-4 border-r pr-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-semibold">Wallet Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Main Checking Account"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="balance" className="text-lg font-semibold">Current Balance</Label>
                    <Input
                      id="balance"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Color</Label>
                    <div className="flex gap-3">
                      {walletColors.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setColor(c)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            color === c ? 'border-foreground scale-110' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Icon Grid */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold">Select Wallet Icon</Label>
                    <div className="space-y-4 max-h-96 overflow-y-auto overflow-x-hidden">
                      {getWalletCategories().map((category) => {
                        const categoryTypes = getWalletTypesByCategory(category);
                        if (categoryTypes.length === 0) return null;
                        
                        return (
                          <div key={category} className="space-y-3">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                              {category}
                            </h3>
                            <div className="grid grid-cols-5 gap-4">
                              {categoryTypes.map((walletType) => {
                                const IconComponent = IconMap[walletType.icon];
                                const isSelected = selectedWalletType.name === walletType.name;
                                
                                return (
                                  <button
                                    key={walletType.name}
                                    type="button"
                                    onClick={() => setSelectedWalletType(walletType)}
                                    className={`p-4 rounded-lg transition-all hover:scale-105 ${
                                      isSelected
                                        ? 'bg-primary/10 scale-105'
                                        : 'hover:bg-muted/50'
                                    }`}
                                  >
                                    <div className="flex flex-col items-center gap-3">
                                      {IconComponent && (
                                        <IconComponent
                                          size={28}
                                          style={{ color: color }}
                                        />
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button type="submit" className="w-full max-w-md h-12 text-lg">
                  Add Wallet
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-muted-foreground">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-4xl font-bold ${totalBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
            {formatCurrency(totalBalance)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Across {wallets.length} wallet{wallets.length !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map((wallet) => {
          const IconComponent = getWalletIcon(wallet.type);
          const walletTypeOption = ALL_WALLET_TYPES.find(wt => wt.name === wallet.type);
          const display_name = walletTypeOption?.display_name || wallet.type;

          return (
            <Card key={wallet.id} className="relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: wallet.color }}
              />
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${wallet.color}20` }}
                    >
                      <IconComponent className="h-5 w-5" style={{ color: wallet.icon_color }} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{wallet.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{display_name}</p>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteWallet(wallet.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Wallet</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{wallet.name}"? This action cannot be undone and all transactions associated with this wallet will also be deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={cancelDeleteWallet}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteWallet} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Wallet
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    wallet.balance >= 0 ? 'text-foreground' : 'text-destructive'
                  }`}
                >
                  {formatCurrency(wallet.balance)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {wallets.length === 0 && (
        <Card className="p-12 text-center">
          <WalletIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No wallets yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your first wallet to start tracking your money
          </p>
          <Button onClick={() => setOpen(true)}>
            <Plus size={20} className="mr-2" />
            Add Wallet
          </Button>
        </Card>
      )}
      
      <TransferModal
        isOpen={transferOpen}
        onClose={() => setTransferOpen(false)}
        wallets={wallets}
        onTransfer={handleTransfer}
      />
    </div>
  );
}
