# Integration Guide: Frontend with Backend

This guide provides instructions on how to integrate the frontend (React) with the backend (FastAPI).

## Overview

The frontend currently uses mock data stored in the `AppContext`. To integrate with the backend, you will need to:

1. Replace the mock data with API calls to the backend.
2. Update the context functions to make API calls instead of directly updating the state.

## Steps to Integrate

### 1. Update the `AppContext` to Use API Calls

Replace the mock data in `src/context/AppContext.tsx` with API calls to the backend. For example:

```typescript
// Replace the demo data with API calls
const [transactions, setTransactions] = useState<Transaction[]>([]);
const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
const [wallets, setWallets] = useState<Wallet[]>([]);
const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

// Fetch data from the backend
useEffect(() => {
  const fetchData = async () => {
    try {
      const [transactionsRes, savingsGoalsRes, walletsRes, userProfileRes] = await Promise.all([
        fetch("http://localhost:8000/api/users/1/transactions/"),
        fetch("http://localhost:8000/api/users/1/savings_goals/"),
        fetch("http://localhost:8000/api/users/1/wallets/"),
        fetch("http://localhost:8000/api/users/1")
      ]);
      
      const transactionsData = await transactionsRes.json();
      const savingsGoalsData = await savingsGoalsRes.json();
      const walletsData = await walletsRes.json();
      const userProfileData = await userProfileRes.json();
      
      setTransactions(transactionsData);
      setSavingsGoals(savingsGoalsData);
      setWallets(walletsData);
      setUserProfile(userProfileData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  fetchData();
}, []);
```

### 2. Update Context Functions to Make API Calls

Update the context functions to make API calls instead of directly updating the state. For example:

```typescript
// Update the addTransaction function to make an API call
const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
  try {
    const response = await fetch("http://localhost:8000/api/users/1/transactions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    const newTransaction = await response.json();
    setTransactions(prev => [newTransaction, ...prev]);
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};

// Update the deleteTransaction function to make an API call
const deleteTransaction = async (id: string) => {
  try {
    await fetch(`http://localhost:8000/api/transactions/${id}`, {
      method: "DELETE",
    });
    setTransactions(prev => prev.filter(t => t.id !== id));
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};
```

### 3. Update the Frontend to Use the Updated Context

Ensure that all components that use the `useApp` hook are updated to handle the new API-based state management. For example:

```typescript
// Example: Update the Transactions page to use the new context
const TransactionsPage = () => {
  const { transactions, deleteTransaction } = useApp();
  
  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
  };
  
  return (
    <div>
      {transactions.map(transaction => (
        <div key={transaction.id}>
          <span>{transaction.description}</span>
          <button onClick={() => handleDelete(transaction.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
```

### 4. Handle Authentication

Update the authentication logic to use the backend API. For example:

```typescript
// Update the Auth page to use the backend API
const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useApp();
  
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const user = await response.json();
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  
  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
```

### 5. Test the Integration

1. Start the backend server:
   ```bash
   cd backend
   python run_server.py
   ```

2. Start the frontend development server:
   ```bash
   cd ..
   npm run dev
   ```

3. Open the frontend in your browser and test the integration.

## Notes

- Ensure that the backend server is running before starting the frontend.
- Update the API endpoints in the frontend to match the backend API routes.
- Handle errors gracefully in the frontend to provide a good user experience.
- Consider using environment variables for the backend API URL to make it configurable.

## Troubleshooting

- **CORS Issues**: Ensure that the backend has CORS enabled. The backend is already configured to allow all origins.
- **Connection Issues**: Ensure that the backend server is running and accessible from the frontend.
- **Authentication Issues**: Ensure that the authentication logic is correctly implemented and matches the backend API.

## Conclusion

By following these steps, you can integrate the frontend with the backend and replace the mock data with real API calls. This will provide a more robust and scalable solution for your application.