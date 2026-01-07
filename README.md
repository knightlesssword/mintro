# 💜 Mintro

A comprehensive personal finance management application built with modern web technologies. Track your income, expenses, savings goals, and financial progress with an intuitive and responsive interface.

![Mintro](https://img.shields.io/badge/Status-Active-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![React](https://img.shields.io/badge/React-18.3.1-61dafb) ![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688)

## ✨ Features

### 💰 Financial Management
- **Multi-Wallet Support**: Manage cash, credit cards, debit cards, bank accounts, and more
- **Transaction Tracking**: Add, view, edit, and delete income/expense transactions
- **Real-time Balance Updates**: Automatic balance calculations across all wallets
- **Fund Transfers**: Transfer money between wallets with transaction history

### 🎯 Savings & Goals
- **Savings Goals**: Set and track financial targets with progress monitoring
- **Linked Wallets**: Connect savings goals to specific wallets
- **Progress Visualization**: Track your journey towards financial goals

### 📊 Analytics & Reports
- **Interactive Dashboard**: Overview of your financial health
- **Income vs Expenses**: Visual breakdown of your spending patterns
- **Quick Statistics**: Average transactions, largest expenses, savings rate
- **Recent Activity**: Latest transactions with detailed information
- **Category Analysis**: Track spending by category

### 👤 User Experience
- **Secure Authentication**: User registration and login system
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Data Persistence**: Secure local storage with session management

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and context
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icons
- **React Router DOM 6.30.1** - Client-side routing
- **React Hook Form 7.61.1** - Performant forms with validation
- **Recharts 2.15.4** - Composable charting library

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Robust relational database
- **SQLAlchemy** - Python SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations

### Development Tools
- **ESLint 9.32.0** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS post-processor
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.7+
- **PostgreSQL** 12+

### Frontend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd purple-wealth-hub-main
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment** (recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**:
   ```bash
   # Create database
   createdb purple_wealth_hub
   ```

5. **Initialize database**:
   ```bash
   python init_db.py
   ```

6. **Start the backend server**:
   ```bash
   python run_server.py
   ```

   The API will be available at `http://localhost:8000`

## 📁 Project Structure

```
purple-wealth-hub-main/
├── src/
│   ├── api/                    # API integration modules
│   │   ├── authApi.ts         # Authentication endpoints
│   │   ├── userApi.ts         # User management
│   │   ├── walletApi.ts       # Wallet operations
│   │   ├── transactionApi.ts  # Transaction handling
│   │   ├── savingsApi.ts      # Savings goals
│   │   ├── categoryApi.ts     # Category management
│   │   └── transferApi.ts     # Fund transfers
│   ├── services/              # Business logic services
│   │   ├── themeService.ts    # Theme management
│   │   ├── storageService.ts  # Local storage utilities
│   │   ├── validationService.ts # Data validation
│   │   └── transformService.ts # Data transformation
│   ├── context/               # React context providers
│   │   └── AppContext.tsx     # Main application context
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   └── layout/           # Layout components
│   ├── pages/                # Application pages
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── Transactions.tsx  # Transaction management
│   │   ├── Wallets.tsx       # Wallet management
│   │   ├── Savings.tsx       # Savings goals
│   │   ├── Reports.tsx       # Financial reports
│   │   ├── Settings.tsx      # User settings
│   │   └── Auth.tsx          # Authentication
│   └── utils/                # Utility functions
├── backend/                  # FastAPI backend
│   ├── main.py              # FastAPI application
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── crud.py              # Database operations
│   ├── database.py          # Database configuration
│   └── api.py               # API routes
└── public/                  # Static assets
```

## 🔧 Available Scripts

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
```

### Backend Scripts
```bash
python run_server.py      # Start FastAPI server
python init_db.py         # Initialize database
python test_backend.py    # Run backend tests
```

## 📊 API Endpoints

### Authentication
- `POST /api/login/` - User login
- `POST /api/users/` - User registration

### User Management
- `GET /api/users/{user_id}` - Get user profile
- `PUT /api/users/{user_id}/profile` - Update user profile

### Wallets
- `GET /api/users/{user_id}/wallets/` - Get user wallets
- `POST /api/users/{user_id}/wallets/` - Create wallet
- `PUT /api/wallets/{wallet_id}` - Update wallet
- `DELETE /api/wallets/{wallet_id}` - Delete wallet

### Transactions
- `GET /api/users/{user_id}/transactions/` - Get user transactions
- `POST /api/users/{user_id}/transactions/` - Create transaction
- `DELETE /api/transactions/{transaction_id}` - Delete transaction

### Savings Goals
- `GET /api/users/{user_id}/savings_goals/` - Get savings goals
- `POST /api/users/{user_id}/savings_goals/` - Create savings goal
- `PUT /api/savings_goals/{goal_id}` - Update savings goal
- `DELETE /api/savings_goals/{goal_id}` - Delete savings goal

### Transfers
- `POST /api/users/{user_id}/transfer/` - Transfer between wallets

### Categories
- `GET /api/transaction_categories/` - Get transaction categories

## 🎨 Features in Detail

### Dashboard
- **Financial Overview**: Total income, expenses, and net balance
- **Recent Transactions**: Latest 5 transactions with details
- **Quick Statistics**: Transaction counts, averages, and insights
- **Savings Rate**: Calculate and display savings percentage

### Transaction Management
- **Add Transactions**: Income and expense tracking
- **Categorization**: Organize transactions by categories
- **Date Tracking**: Record transaction dates
- **Description**: Add detailed descriptions
- **Balance Validation**: Prevent overspending

### Wallet Management
- **Multiple Types**: Support for various wallet types
- **Color Coding**: Visual wallet identification
- **Balance Tracking**: Real-time balance updates
- **CRUD Operations**: Full wallet lifecycle management

### Savings Goals
- **Goal Setting**: Set financial targets
- **Progress Tracking**: Monitor goal completion
- **Linked Wallets**: Connect goals to specific wallets
- **Target Dates**: Set deadline for goals

## 🔐 Security Features

- **Secure Authentication**: JWT-based user authentication
- **Data Validation**: Input validation on both frontend and backend
- **Session Management**: Secure session handling
- **CORS Protection**: Cross-origin resource sharing controls

## 🌙 Theme Support

- **Light/Dark Mode**: Toggle between themes
- **System Preference**: Automatic theme detection
- **Persistent Settings**: Theme preferences saved locally
- **Smooth Transitions**: Animated theme switching

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Seamless tablet experience
- **Desktop Enhanced**: Full-featured desktop interface
- **Touch-Friendly**: Optimized touch interactions

## 🧪 Testing

### Frontend Testing
```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Backend Testing
```bash
# Run backend tests
cd backend
python test_backend.py
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include steps to reproduce the problem
4. Provide your environment details (OS, Node.js version, etc.)

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful UI components
- **Radix UI** for accessible primitives
- **Lucide** for the icon set
- **FastAPI** team for the excellent Python framework
- **React** team for the amazing library

---

**Made with 💜 for better personal finance management**
