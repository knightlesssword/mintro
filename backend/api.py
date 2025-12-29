from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, models
from database import get_db

router = APIRouter()

# Authentication endpoints
@router.post("/login/")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "user_id": db_user.id, "email": db_user.email}

# User endpoints
@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@router.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# User profile endpoints
@router.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.update_user(db, user_id=user_id, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# User profile endpoints
@router.put("/users/{user_id}/profile", response_model=schemas.User)
def update_user_profile(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = crud.update_user(db, user_id=user_id, user_update=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Wallet endpoints
@router.post("/users/{user_id}/wallets/", response_model=schemas.Wallet)
def create_wallet_for_user(user_id: int, wallet: schemas.WalletCreate, db: Session = Depends(get_db)):
    return crud.create_wallet(db=db, wallet=wallet, user_id=user_id)

@router.get("/users/{user_id}/wallets/", response_model=list[schemas.Wallet])
def read_wallets(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    wallets = crud.get_wallets(db, user_id=user_id, skip=skip, limit=limit)
    return wallets

@router.get("/wallets/{wallet_id}", response_model=schemas.Wallet)
def read_wallet(wallet_id: int, db: Session = Depends(get_db)):
    db_wallet = crud.get_wallet(db, wallet_id=wallet_id)
    if db_wallet is None:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return db_wallet

@router.put("/wallets/{wallet_id}", response_model=schemas.Wallet)
def update_wallet(wallet_id: int, wallet: schemas.WalletCreate, db: Session = Depends(get_db)):
    db_wallet = crud.update_wallet(db, wallet_id=wallet_id, wallet=wallet)
    if db_wallet is None:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return db_wallet

@router.delete("/wallets/{wallet_id}")
def delete_wallet(wallet_id: int, db: Session = Depends(get_db)):
    db_wallet = crud.delete_wallet(db, wallet_id=wallet_id)
    if db_wallet is None:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return {"message": "Wallet deleted successfully"}

# Transfer endpoints
@router.post("/users/{user_id}/transfer/")
def transfer_balance(user_id: int, transfer_data: schemas.TransferRequest, db: Session = Depends(get_db)):
    try:
        result = crud.transfer_balance(db, user_id=user_id, transfer_data=transfer_data)
        return {"message": "Transfer successful", "result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Transaction endpoints
@router.post("/users/{user_id}/transactions/", response_model=schemas.Transaction)
def create_transaction_for_user(user_id: int, transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    return crud.create_transaction(db=db, transaction=transaction, user_id=user_id)

@router.get("/users/{user_id}/transactions/", response_model=list[schemas.Transaction])
def read_transactions(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    transactions = crud.get_transactions(db, user_id=user_id, skip=skip, limit=limit)
    return transactions

@router.delete("/transactions/{transaction_id}", response_model=schemas.Transaction)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    db_transaction = crud.delete_transaction(db, transaction_id=transaction_id)
    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction

# Savings Goal endpoints
@router.post("/users/{user_id}/savings_goals/", response_model=schemas.SavingsGoal)
def create_savings_goal_for_user(user_id: int, savings_goal: schemas.SavingsGoalCreate, db: Session = Depends(get_db)):
    return crud.create_savings_goal(db=db, savings_goal=savings_goal, user_id=user_id)

@router.get("/users/{user_id}/savings_goals/", response_model=list[schemas.SavingsGoal])
def read_savings_goals(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    savings_goals = crud.get_savings_goals(db, user_id=user_id, skip=skip, limit=limit)
    return savings_goals

@router.put("/savings_goals/{savings_goal_id}", response_model=schemas.SavingsGoal)
def update_savings_goal(savings_goal_id: int, savings_goal: schemas.SavingsGoalCreate, db: Session = Depends(get_db)):
    db_savings_goal = crud.update_savings_goal(db, savings_goal_id=savings_goal_id, savings_goal=savings_goal)
    if db_savings_goal is None:
        raise HTTPException(status_code=404, detail="Savings goal not found")
    return db_savings_goal

@router.delete("/savings_goals/{savings_goal_id}", response_model=schemas.SavingsGoal)
def delete_savings_goal(savings_goal_id: int, db: Session = Depends(get_db)):
    db_savings_goal = crud.delete_savings_goal(db, savings_goal_id=savings_goal_id)
    if db_savings_goal is None:
        raise HTTPException(status_code=404, detail="Savings goal not found")
    return db_savings_goal

# Reference data endpoints
@router.get("/currencies/", response_model=list[schemas.Currency])
def read_currencies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    currencies = db.query(models.Currency).offset(skip).limit(limit).all()
    return currencies

@router.get("/countries/", response_model=list[schemas.Country])
def read_countries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    countries = db.query(models.Country).offset(skip).limit(limit).all()
    return countries

@router.get("/wallet_types/", response_model=list[schemas.WalletType])
def read_wallet_types(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    wallet_types = db.query(models.WalletType).offset(skip).limit(limit).all()
    return wallet_types

@router.get("/transaction_categories/", response_model=list[schemas.TransactionCategory])
def read_transaction_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = db.query(models.TransactionCategory).offset(skip).limit(limit).all()
    return categories

@router.get("/transaction_categories/by_name/{category_name}", response_model=schemas.TransactionCategory)
def get_transaction_category_by_name(category_name: str, db: Session = Depends(get_db)):
    category = crud.get_transaction_category_by_name(db, category_name=category_name)
    if category is None:
        raise HTTPException(status_code=404, detail=f"Category '{category_name}' not found")
    return category