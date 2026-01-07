import requests
import json

# Test the backend API
BASE_URL = "http://localhost:8000/api"

def test_create_user():
    user_data = {
        "name": "Test User",
        "email": "test@example.com",
        "mobile": "1234567890",
        "dob": "1990-01-01",
        "country": "USA",
        "currency": "USD"
    }
    response = requests.post(f"{BASE_URL}/users/", json=user_data)
    print("Create User Response:", response.json())
    return response.json()

def test_get_users():
    response = requests.get(f"{BASE_URL}/users/")
    print("Get Users Response:", response.json())
    return response.json()

def test_create_wallet(user_id: int):
    wallet_data = {
        "name": "Test Wallet",
        "type": "cash",
        "balance": 1000.0,
        "color": "#000000"
    }
    response = requests.post(f"{BASE_URL}/users/{user_id}/wallets/", json=wallet_data)
    print("Create Wallet Response:", response.json())
    return response.json()

def test_get_wallets(user_id: int):
    response = requests.get(f"{BASE_URL}/users/{user_id}/wallets/")
    print("Get Wallets Response:", response.json())
    return response.json()

if __name__ == "__main__":
    print("Testing Mintro Backend API...")
    
    # Test user creation and retrieval
    user = test_create_user()
    test_get_users()
    
    # Test wallet creation and retrieval
    if user:
        wallet = test_create_wallet(user["id"])
        test_get_wallets(user["id"])
    
    print("Backend API tests completed.")