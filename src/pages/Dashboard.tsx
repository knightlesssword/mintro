import { useMemo } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Calculator, Target, Percent, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddTransactionDialog } from '@/components/AddTransactionDialog';
import { useApp } from '@/context/AppContext';

export default function Dashboard() {
  const { transactions, userProfile } = useApp();

  const recentTransactions = useMemo(() => {
    return transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  const { totalIncome, totalExpense, quickStats } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate quick stats
    const totalTransactions = transactions.length;
    const incomeTransactions = transactions.filter(t => t.type === 'income').length;
    const expenseTransactions = transactions.filter(t => t.type === 'expense').length;
    const avgTransaction = totalTransactions > 0 ? (income + expense) / totalTransactions : 0;
    const largestTransaction = transactions.length > 0 ? Math.max(...transactions.map(t => t.amount)) : 0;
    const smallestTransaction = transactions.length > 0 ? Math.min(...transactions.map(t => t.amount)) : 0;
    
    // Find most active category
    const categoryCount = new Map<string, number>();
    transactions.forEach(t => {
      const count = categoryCount.get(t.category) || 0;
      categoryCount.set(t.category, count + 1);
    });
    const mostActiveCategory = categoryCount.size > 0 
      ? Array.from(categoryCount.entries()).reduce((a, b) => a[1] > b[1] ? a : b)[0]
      : 'None';

    // Find biggest expense category by amount
    const expenseCategoryAmount = new Map<string, number>();
    transactions.filter(t => t.type === 'expense').forEach(t => {
      const existing = expenseCategoryAmount.get(t.category) || 0;
      expenseCategoryAmount.set(t.category, existing + t.amount);
    });
    const biggestExpenseCategory = expenseCategoryAmount.size > 0
      ? Array.from(expenseCategoryAmount.entries()).reduce((a, b) => a[1] > b[1] ? a : b)[0]
      : 'None';

    // Find most active month
    const monthCount = new Map<string, number>();
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const count = monthCount.get(month) || 0;
      monthCount.set(month, count + 1);
    });
    const mostActiveMonth = monthCount.size > 0
      ? Array.from(monthCount.entries()).reduce((a, b) => a[1] > b[1] ? a : b)[0]
      : 'None';

    // Calculate savings rate
    const netSavings = income - expense;
    const savingsRate = income > 0 ? (netSavings / income) * 100 : 0;

    return { 
      totalIncome: income, 
      totalExpense: expense, 
      quickStats: {
        totalTransactions,
        incomeTransactions,
        expenseTransactions,
        avgTransaction,
        largestTransaction,
        smallestTransaction,
        mostActiveCategory,
        biggestExpenseCategory,
        mostActiveMonth,
        netSavings,
        savingsRate
      }
    };
  }, [transactions]);

  const formatCurrency = (amount: number) => {
    // Use USD as default if currency is not available
    const currencyCode = userProfile.currency || 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {userProfile.name}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Income
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(totalIncome)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalExpense)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Balance
            </CardTitle>
            {totalIncome - totalExpense >= 0 ? (
              <ArrowUpRight className="h-4 w-4 text-success" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalIncome - totalExpense >= 0 ? 'text-success' : 'text-destructive'}`}>
              {formatCurrency(totalIncome - totalExpense)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="font-medium">{transaction.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === 'income'
                          ? 'text-success'
                          : 'text-destructive'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            {quickStats.totalTransactions > 0 ? (
              <div className="space-y-4">
                {/* Transaction Counts */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-success/20">
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Income</p>
                      <p className="font-semibold">{quickStats.incomeTransactions}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-destructive/20">
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expenses</p>
                      <p className="font-semibold">{quickStats.expenseTransactions}</p>
                    </div>
                  </div>
                </div>

                {/* Averages and Records */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Average Transaction</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(quickStats.avgTransaction)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Largest Transaction</span>
                    </div>
                    <span className="font-semibold text-primary">{formatCurrency(quickStats.largestTransaction)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Smallest Transaction</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(quickStats.smallestTransaction)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Most Active Category</span>
                    </div>
                    <span className="font-semibold">{quickStats.mostActiveCategory}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Biggest Expense Category</span>
                    </div>
                    <span className="font-semibold">{quickStats.biggestExpenseCategory}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Most Active Month</span>
                    </div>
                    <span className="font-semibold">{quickStats.mostActiveMonth}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Savings Rate</span>
                    </div>
                    <span className={`font-semibold ${
                      quickStats.savingsRate >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {quickStats.savingsRate >= 0 ? '+' : ''}{quickStats.savingsRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No transaction data available</p>
                  <p className="text-sm">Add some transactions to see quick stats</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
