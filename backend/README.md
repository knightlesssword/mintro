# 💜 Mintro - Backend API

FastAPI-based backend for the Mintro, personal finance management application. Provides RESTful APIs for user management, wallet operations, transaction tracking, and savings goals.

![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688) ![Python](https://img.shields.io/badge/Python-3.7+-3776AB) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-336791) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-Latest-CA2424)

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **User Management**: Complete user profile management
- **Wallet Operations**: Full CRUD operations for multiple wallet types
- **Transaction Tracking**: Income/expense management with categories
- **Savings Goals**: Goal setting and progress tracking
- **Fund Transfers**: Inter-wallet balance transfers
- **Reference Data**: Currencies, countries, wallet types, and categories
- **Database Integration**: PostgreSQL with SQLAlchemy ORM
- **API Documentation**: Auto-generated Swagger/OpenAPI docs

## 🛠️ Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Python SQL toolkit and ORM
- **PostgreSQL** - Robust relational database
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server for FastAPI
- **Psycopg2** - PostgreSQL adapter for Python
- **Passlib** - Password hashing utilities
- **Python-dotenv** - Environment variable management

## 📋 Prerequisites

- **Python 3.7+**
- **PostgreSQL 12+**
- **pip** (Python package installer)

## ⚡ Quick Start

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd purple-wealth-hub-main/backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Database Setup

#### Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE purple_wealth_hub;
\q
```

#### Configure Environment
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/purple_wealth_hub
```

**Note**: Update the credentials according to your PostgreSQL setup.

### 5. Initialize Database
```bash
python init_db.py
```

This will:
- Create all database tables
- Seed initial reference data (currencies, countries, wallet types, categories)
- Set up the database schema

### 6. Start the Server
```bash
python run_server.py
```

The API will be available at:
- **Base URL**: `http://localhost:8000`
- **API Documentation**: `http://localhost:8000/docs`
- **Alternative Docs**: `http://localhost:8000/redoc`

## 📁 Project Structure

```
backend/
├── .env                    # Environment variables
├── main.py                 # FastAPI application entry point
├── run_server.py          # Server startup script
├── init_db.py             # Database initialization
├── test_backend.py        # Backend tests
├── api.py                 # API routes and endpoints
├── models.py              # SQLAlchemy database models
├── schemas.py             # Pydantic models for API
├── crud.py                # Database operations
├── database.py            # Database configuration
├── create_tables.sql      # SQL table creation script
├── seed_data.sql          # Sample data insertion
├── requirements.txt       # Python dependencies
└── INTEGRATION_GUIDE.md   # Frontend integration guide
```

## 🔌 API Endpoints

### Authentication
```
POST /api/login/           # User authentication
```

### Users
```
POST /api/users/           # Create new user
GET  /api/users/           # Get all users (admin)
GET  /api/users/{user_id}  # Get specific user
PUT  /api/users/{user_id}  # Update user
PUT  /api/users/{user_id}/profile  # Update user profile
```

### Wallets
```
POST /api/users/{user_id}/wallets/   # Create wallet for user
GET  /api/users/{user_id}/wallets/   # Get all wallets for user
GET  /api/wallets/{wallet_id}        # Get specific wallet
PUT  /api/wallets/{wallet_id}        # Update wallet
DELETE /api/wallets/{wallet_id}      # Delete wallet
```

### Transactions
```
POST /api/users/{user_id}/transactions/   # Create transaction for user
GET  /api/users/{user_id}/transactions/   # Get all transactions for user
DELETE /api/transactions/{transaction_id} # Delete specific transaction
```

### Savings Goals
```
POST /api/users/{user_id}/savings_goals/   # Create savings goal for user
GET  /api/users/{user_id}/savings_goals/   # Get all savings goals for user
PUT  /api/savings_goals/{savings_goal_id}  # Update savings goal
DELETE /api/savings_goals/{savings_goal_id} # Delete savings goal
```

### Transfers
```
POST /api/users/{user_id}/transfer/        # Transfer balance between wallets
```

### Reference Data
```
GET /api/currencies/                # Get all currencies
GET /api/countries/                 # Get all countries
GET /api/wallet_types/              # Get all wallet types
GET /api/transaction_categories/    # Get all transaction categories
GET /api/transaction_categories/by_name/{category_name}  # Get category by name
```

## 📊 Database Schema

### Core Tables
- **Users** - User accounts and profiles
- **Wallets** - User's financial accounts
- **Transactions** - Income and expense records
- **SavingsGoals** - Financial goal tracking
- **Transfers** - Inter-wallet balance transfers

### Reference Tables
- **Currencies** - Supported currency types
- **Countries** - Country information
- **WalletTypes** - Types of wallets (cash, credit card, etc.)
- **TransactionCategories** - Spending categories

## 🧪 Testing

### Run Backend Tests
```bash
python test_backend.py
```

### Manual API Testing

You can test the API endpoints using **Postman**, **cURL**, or any HTTP client:

#### Create a User
```bash
curl -X POST "http://localhost:8000/api/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "mobile": "1234567890",
    "dob": "1990-01-01",
    "country_id": 1,
    "currency_id": 1
  }'
```

#### Login
```bash
curl -X POST "http://localhost:8000/api/login/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

#### Create a Wallet
```bash
curl -X POST "http://localhost:8000/api/users/1/wallets/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Main Wallet",
    "type_id": 1,
    "balance": 1000.00,
    "color": "#3b82f6"
  }'
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/purple_wealth_hub

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True

# Security
SECRET_KEY=your-secret-key-here
```

### Database Configuration

The application uses SQLAlchemy with PostgreSQL. Update the `DATABASE_URL` in your `.env` file to match your PostgreSQL setup:

```python
# Example configurations:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/purple_wealth_hub
DATABASE_URL=postgresql://username:password@localhost:5432/purple_wealth_hub
DATABASE_URL=postgresql://username:password@host:port/database_name
```

## 🔒 Security Features

- **Password Hashing**: Argon2 algorithm for secure password storage
- **Input Validation**: Pydantic models for request/response validation
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Error Handling**: Proper HTTP status codes and error messages

## 📈 Performance

- **Connection Pooling**: SQLAlchemy connection pool for database efficiency
- **Async Support**: FastAPI's async/await support for concurrent requests
- **Pagination**: Built-in pagination for list endpoints
- **Query Optimization**: Efficient database queries with proper indexing

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**:
   ```bash
   # Set production environment variables
   export DATABASE_URL=postgresql://user:pass@prod-db:5432/purple_wealth_hub
   export SECRET_KEY=your-production-secret-key
   export DEBUG=False
   ```

2. **Database Migration**:
   ```bash
   python init_db.py
   ```

3. **Production Server**:
   ```bash
   # Using Gunicorn with Uvicorn workers
   pip install gunicorn
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

### Docker Deployment (Optional)

Create a `Dockerfile`:
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["python", "run_server.py"]
```

## 🔧 Development

### Adding New Endpoints

1. **Define Schema** in `schemas.py`
2. **Create Model** in `models.py` (if new table needed)
3. **Add CRUD Operations** in `crud.py`
4. **Create Route** in `api.py`
5. **Update Tests** in `test_backend.py`

### Database Migrations

For schema changes, update `create_tables.sql` and `seed_data.sql`, then:
```bash
python init_db.py
```

## 📚 API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🤝 Integration

The backend is designed to work seamlessly with the React frontend. See the `INTEGRATION_GUIDE.md` for detailed integration instructions.

## 📝 License

This project is licensed under the MIT License - see the main project LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Ensure database exists

2. **Import Errors**:
   - Verify virtual environment is activated
   - Check all dependencies are installed

3. **Port Already in Use**:
   ```bash
   # Kill process using port 8000
   lsof -ti:8000 | xargs kill -9
   ```

### Getting Help

1. Check the API documentation at `/docs`
2. Review logs for error messages
3. Test endpoints individually with curl/Postman
4. Check database connection and table creation

---

**Built with 💜 for Mintro**