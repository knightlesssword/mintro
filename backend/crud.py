from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException
from datetime import date
from decimal import Decimal

# User CRUD operations
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not user.verify_password(password):
        return None
    return user

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        email=user.email,
        mobile=user.mobile,
        dob=user.dob,
        country_id=user.country_id,
        currency_id=user.currency_id
    )
    db_user.set_password(user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# User profile CRUD operations
def update_user(db: Session, user_id: int, user_update: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        for key, value in user_update.dict(exclude_unset=True).items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

# Wallet CRUD operations
def get_wallet(db: Session, wallet_id: int):
    return db.query(models.Wallet).filter(models.Wallet.id == wallet_id).first()

def get_wallets(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Wallet).filter(models.Wallet.owner_id == user_id).offset(skip).limit(limit).all()

def create_wallet(db: Session, wallet: schemas.WalletCreate, user_id: int):
    db_wallet = models.Wallet(**wallet.dict(), owner_id=user_id)
    db.add(db_wallet)
    db.commit()
    db.refresh(db_wallet)
    return db_wallet

def update_wallet(db: Session, wallet_id: int, wallet: schemas.WalletCreate):
    db_wallet = db.query(models.Wallet).filter(models.Wallet.id == wallet_id).first()
    if db_wallet:
        for key, value in wallet.dict().items():
            setattr(db_wallet, key, value)
        db.commit()
        db.refresh(db_wallet)
    return db_wallet

def delete_wallet(db: Session, wallet_id: int):
    db_wallet = db.query(models.Wallet).filter(models.Wallet.id == wallet_id).first()
    if db_wallet:
        db.delete(db_wallet)
        db.commit()
    return db_wallet

# Transaction Category CRUD operations
def get_transaction_category_by_name(db: Session, category_name: str):
    return db.query(models.TransactionCategory).filter(models.TransactionCategory.name == category_name).first()

def get_transaction_categories(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.TransactionCategory).offset(skip).limit(limit).all()

# Transaction CRUD operations
def get_transaction(db: Session, transaction_id: int):
    return db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()

def get_transactions(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Transaction).filter(models.Transaction.owner_id == user_id).offset(skip).limit(limit).all()

def create_transaction(db: Session, transaction: schemas.TransactionCreate, user_id: int):
    # Get the wallet to validate balance for expense transactions
    wallet = db.query(models.Wallet).filter(
        models.Wallet.id == transaction.wallet_id,
        models.Wallet.owner_id == user_id
    ).first()
    
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    
    # Validate balance for expense transactions
    if transaction.type == 'expense':
        amount_decimal = Decimal(str(transaction.amount))
        if wallet.balance < amount_decimal:
            raise HTTPException(
                status_code=400, 
                detail=f"Insufficient balance. Current balance: ${wallet.balance}, Required: ${transaction.amount}"
            )
    
    # Create the transaction
    db_transaction = models.Transaction(**transaction.dict(), owner_id=user_id)
    db.add(db_transaction)
    
    # Update wallet balance
    amount_decimal = Decimal(str(transaction.amount))
    if transaction.type == 'expense':
        wallet.balance -= amount_decimal
    else:  # income
        wallet.balance += amount_decimal
    
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def delete_transaction(db: Session, transaction_id: int):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if db_transaction:
        # Get the wallet to restore balance
        wallet = db.query(models.Wallet).filter(models.Wallet.id == db_transaction.wallet_id).first()
        
        if wallet:
            # Restore the balance (opposite of what was done when created)
            amount_decimal = db_transaction.amount
            if db_transaction.type == 'expense':
                wallet.balance += amount_decimal  # Restore what was subtracted
            else:  # income
                wallet.balance -= amount_decimal  # Subtract what was added
        
        db.delete(db_transaction)
        db.commit()
    return db_transaction

# Savings Goal CRUD operations
def get_savings_goal(db: Session, savings_goal_id: int):
    return db.query(models.SavingsGoal).filter(models.SavingsGoal.id == savings_goal_id).first()

def get_savings_goals(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.SavingsGoal).filter(models.SavingsGoal.owner_id == user_id).offset(skip).limit(limit).all()

def create_savings_goal(db: Session, savings_goal: schemas.SavingsGoalCreate, user_id: int):
    db_savings_goal = models.SavingsGoal(**savings_goal.dict(), owner_id=user_id)
    db.add(db_savings_goal)
    db.commit()
    db.refresh(db_savings_goal)
    return db_savings_goal

def update_savings_goal(db: Session, savings_goal_id: int, savings_goal: schemas.SavingsGoalCreate):
    db_savings_goal = db.query(models.SavingsGoal).filter(models.SavingsGoal.id == savings_goal_id).first()
    if db_savings_goal:
        for key, value in savings_goal.dict().items():
            setattr(db_savings_goal, key, value)
        db.commit()
        db.refresh(db_savings_goal)
    return db_savings_goal

def delete_savings_goal(db: Session, savings_goal_id: int):
    db_savings_goal = db.query(models.SavingsGoal).filter(models.SavingsGoal.id == savings_goal_id).first()
    if db_savings_goal:
        db.delete(db_savings_goal)
        db.commit()
    return db_savings_goal

# Transfer operations
def transfer_balance(db: Session, user_id: int, transfer_data: schemas.TransferRequest):
    # Get source and destination wallets
    from_wallet = db.query(models.Wallet).filter(
        models.Wallet.id == transfer_data.from_wallet_id,
        models.Wallet.owner_id == user_id
    ).first()
    
    to_wallet = db.query(models.Wallet).filter(
        models.Wallet.id == transfer_data.to_wallet_id,
        models.Wallet.owner_id == user_id
    ).first()
    
    if not from_wallet or not to_wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    
    if from_wallet.id == to_wallet.id:
        raise HTTPException(status_code=400, detail="Source and destination wallets cannot be the same")
    
    if from_wallet.balance < transfer_data.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance in source wallet")
    
    # Update wallet balances
    amount_decimal = Decimal(str(transfer_data.amount))
    from_wallet.balance -= amount_decimal
    to_wallet.balance += amount_decimal
    
    # Create transfer transactions
    from_transaction = models.Transaction(
        category_id=None,
        amount=amount_decimal,
        date=date.today(),
        type='expense',
        description=f"Transfer to {to_wallet.name}{f' - {transfer_data.description}' if transfer_data.description else ''}",
        wallet_id=from_wallet.id,
        owner_id=user_id
    )
    
    to_transaction = models.Transaction(
        category_id=None,
        amount=amount_decimal,
        date=date.today(),
        type='income',
        description=f"Transfer from {from_wallet.name}{f' - {transfer_data.description}' if transfer_data.description else ''}",
        wallet_id=to_wallet.id,
        owner_id=user_id
    )
    
    db.add(from_transaction)
    db.add(to_transaction)
    db.commit()
    
    return {
        "from_wallet_balance": from_wallet.balance,
        "to_wallet_balance": to_wallet.balance,
        "from_transaction_id": from_transaction.id,
        "to_transaction_id": to_transaction.id
    }