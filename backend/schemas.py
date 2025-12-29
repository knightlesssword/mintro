from pydantic import BaseModel
from typing import Optional
from datetime import date

# Reference table schemas
class CurrencyBase(BaseModel):
    code: str
    name: str
    symbol: str

class CurrencyCreate(CurrencyBase):
    pass

class Currency(CurrencyBase):
    id: int
    
    class Config:
        orm_mode = True

class CountryBase(BaseModel):
    name: str
    code: str
    currency_id: int

class CountryCreate(CountryBase):
    pass

class Country(CountryBase):
    id: int
    currency: Optional[Currency] = None
    
    class Config:
        orm_mode = True

class WalletTypeBase(BaseModel):
    name: str
    description: Optional[str] = None
    display_name: Optional[str] = None
    icon: Optional[str] = None
    icon_color: Optional[str] = None

class WalletTypeCreate(WalletTypeBase):
    pass

class WalletType(WalletTypeBase):
    id: int
    
    class Config:
        orm_mode = True

class TransactionCategoryBase(BaseModel):
    name: str
    type: str  # 'income' or 'expense'
    description: Optional[str] = None

class TransactionCategoryCreate(TransactionCategoryBase):
    pass

class TransactionCategory(TransactionCategoryBase):
    id: int
    
    class Config:
        orm_mode = True

# Main table schemas
class UserBase(BaseModel):
    name: str
    email: str
    mobile: Optional[str] = None
    dob: Optional[date] = None
    country_id: Optional[int] = None
    currency_id: Optional[int] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    pass

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    country: Optional[Country] = None
    currency: Optional[Currency] = None
    
    class Config:
        orm_mode = True

class WalletBase(BaseModel):
    name: str
    type_id: int
    balance: float
    color: str

class WalletCreate(WalletBase):
    pass

class Wallet(WalletBase):
    id: int
    type: Optional[WalletType] = None
    owner_id: int
    
    class Config:
        orm_mode = True

class TransactionBase(BaseModel):
    category_id: Optional[int] = None
    amount: float
    date: date
    type: str  # 'income' or 'expense'
    description: Optional[str] = None

class TransactionCreate(TransactionBase):
    wallet_id: int

class Transaction(TransactionBase):
    id: int
    category: Optional[TransactionCategory] = None
    wallet_id: Optional[int] = None  # Made optional to handle deleted wallets
    owner_id: int
    
    class Config:
        orm_mode = True

class SavingsGoalBase(BaseModel):
    name: str
    description: Optional[str] = None
    goal_amount: float
    current_amount: float
    target_date: Optional[date] = None
    savings_type: Optional[str] = None
    linked_wallet_id: Optional[int] = None

class SavingsGoalCreate(SavingsGoalBase):
    pass

class SavingsGoal(SavingsGoalBase):
    id: int
    owner_id: int
    
    class Config:
        orm_mode = True

class TransferRequest(BaseModel):
    from_wallet_id: int
    to_wallet_id: int
    amount: float
    description: Optional[str] = None