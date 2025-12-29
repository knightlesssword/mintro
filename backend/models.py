from sqlalchemy import Column, Integer, String, CheckConstraint, Date, ForeignKey, DECIMAL, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from passlib.context import CryptContext

Base = declarative_base()

# Password hashing context
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

class Currency(Base):
    __tablename__ = "currencies"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(3), unique=True, index=True)
    name = Column(String(50), nullable=False)
    symbol = Column(String(5), nullable=False)
    
    countries = relationship("Country", back_populates="currency")
    users = relationship("User", back_populates="currency")

class Country(Base):
    __tablename__ = "countries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    code = Column(String(2), unique=True, index=True)
    currency_id = Column(Integer, ForeignKey("currencies.id"))
    
    currency = relationship("Currency", back_populates="countries")
    users = relationship("User", back_populates="country")

class WalletType(Base):
    __tablename__ = "wallet_types"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True)
    description = Column(String)
    display_name = Column(String(100))
    icon = Column(String(50))
    icon_color = Column(String(7))
    
    wallets = relationship("Wallet", back_populates="type")

class TransactionCategory(Base):
    __tablename__ = "transaction_categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    type = Column(String(10), nullable=False)  # 'income' or 'expense'
    description = Column(String)
    
    transactions = relationship("Transaction", back_populates="category")
    
    __table_args__ = (
        CheckConstraint("type IN ('income', 'expense')", name="transaction_categories_type_check"),
    )

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True)
    password_hash = Column(String(255), nullable=False)
    mobile = Column(String(20))
    dob = Column(Date)
    country_id = Column(Integer, ForeignKey("countries.id"))
    currency_id = Column(Integer, ForeignKey("currencies.id"))
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())
    
    country = relationship("Country", back_populates="users")
    currency = relationship("Currency", back_populates="users")
    wallets = relationship("Wallet", back_populates="owner")
    transactions = relationship("Transaction", back_populates="owner")
    savings_goals = relationship("SavingsGoal", back_populates="owner")
    
    def set_password(self, password: str):
        self.password_hash = pwd_context.hash(password)
    
    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.password_hash)

class Wallet(Base):
    __tablename__ = "wallets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    type_id = Column(Integer, ForeignKey("wallet_types.id"))
    balance = Column(DECIMAL(15, 2), default=0.00)
    color = Column(String(7), default="#000000")
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())
    
    type = relationship("WalletType", back_populates="wallets")
    owner = relationship("User", back_populates="wallets")
    transactions = relationship("Transaction", back_populates="wallet")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("transaction_categories.id"))
    amount = Column(DECIMAL(15, 2), nullable=False)
    date = Column(Date, nullable=False)
    type = Column(String(10), nullable=False)  # 'income' or 'expense'
    description = Column(String)
    wallet_id = Column(Integer, ForeignKey("wallets.id"))
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(TIMESTAMP, default=func.now())
    
    category = relationship("TransactionCategory", back_populates="transactions")
    wallet = relationship("Wallet", back_populates="transactions")
    owner = relationship("User", back_populates="transactions")
    
    __table_args__ = (
        CheckConstraint("type IN ('income', 'expense')", name="transactions_type_check"),
    )

class SavingsGoal(Base):
    __tablename__ = "savings_goals"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String)
    goal_amount = Column(DECIMAL(15, 2), nullable=False)
    current_amount = Column(DECIMAL(15, 2), default=0.00)
    target_date = Column(Date)
    savings_type = Column(String(20), nullable=False, default="individual")  # 'individual' or 'linked'
    linked_wallet_id = Column(Integer, ForeignKey("wallets.id"), nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())
    
    owner = relationship("User", back_populates="savings_goals")
    linked_wallet = relationship("Wallet")
    
    __table_args__ = (
        CheckConstraint("savings_type IN ('individual', 'linked')", name="savings_goals_savings_type_check"),
    )