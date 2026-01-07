import React, { useState } from 'react';
import { ArrowLeftRight, DollarSign, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallets: Array<{
    id: string;
    name: string;
    balance: number;
    color: string;
  }>;
  onTransfer: (fromWalletId: string, toWalletId: string, amount: number, description: string) => void;
}

export function TransferModal({ isOpen, onClose, wallets, onTransfer }: TransferModalProps) {
  const [fromWalletId, setFromWalletId] = useState('');
  const [toWalletId, setToWalletId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleTransfer = () => {
    try {
      setError('');
      
      if (!fromWalletId || !toWalletId) {
        setError('Please select both source and destination wallets');
        return;
      }
      
      if (fromWalletId === toWalletId) {
        setError('Source and destination wallets cannot be the same');
        return;
      }
      
      const amountNum = parseFloat(amount);
      if (!amountNum || amountNum <= 0) {
        setError('Please enter a valid amount');
        return;
      }
      
      const fromWallet = wallets.find(w => w.id === fromWalletId);
      if (fromWallet && fromWallet.balance < amountNum) {
        setError('Insufficient balance in source wallet');
        return;
      }
      
      onTransfer(fromWalletId, toWalletId, amountNum, description);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed');
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const fromWallet = wallets.find(w => w.id === fromWalletId);
  const toWallet = wallets.find(w => w.id === toWalletId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <ArrowLeftRight className="h-6 w-6 text-blue-600" />
            Transfer Balance
          </DialogTitle>
          <DialogDescription>
            Move money between your wallets
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-4">
          {/* Left Column - Form Fields */}
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Source Wallet */}
            <div className="space-y-2">
              <Label htmlFor="fromWallet">From Wallet</Label>
              <Select value={fromWalletId} onValueChange={setFromWalletId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source wallet" />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map(wallet => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{wallet.name}</span>
                        <span className="text-sm text-gray-500 ml-4">
                          {wallet.balance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Destination Wallet */}
            <div className="space-y-2">
              <Label htmlFor="toWallet">To Wallet</Label>
              <Select value={toWalletId} onValueChange={setToWalletId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination wallet" />
                </SelectTrigger>
                <SelectContent>
                  {wallets
                    .filter(wallet => wallet.id !== fromWalletId)
                    .map(wallet => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{wallet.name}</span>
                          <span className="text-sm text-gray-500 ml-4">
                            {wallet.balance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Transfer for rent payment"
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Right Column - Summary and Actions */}
          <div className="space-y-4">
            {/* Transfer Summary */}
            {fromWallet && toWallet && amount && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Transfer Details</span>
                </div>
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium">{fromWallet.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium">{toWallet.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-green-600">
                      {parseFloat(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </span>
                  </div>
                  {fromWallet.balance < parseFloat(amount) && (
                    <div className="text-red-600 text-sm font-medium">
                      Insufficient balance
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleTransfer}
                disabled={!fromWalletId || !toWalletId || !amount || parseFloat(amount) <= 0}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                Transfer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}