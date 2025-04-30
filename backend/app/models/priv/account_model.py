"""
This defines an account
"""

from datetime import datetime
from mongoengine import Document, StringField, DateTimeField, BooleanField, IntField, NotUniqueError, FloatField, UUIDField
import secrets
import string
import uuid
from app.env_settings import get_settings
from app.helpers.hashing_helper import hash_string_bcrypt

class sAccount(Document):
    # Unique constraint on contact_email
    contact_email = StringField(required=True, unique=True)
    hashed_password = StringField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    created_at = DateTimeField(
        default=datetime.utcnow, required=True)  # Creation timestamp
    blocked = BooleanField(default=False)  # Is the customer blocked?
    needs_recovery = BooleanField(default=False)
    account_fid = UUIDField(binary=False, default=uuid.uuid4, unique=True)
    # This is to make sure that if a token is re-issued, all older access tokens are rendered invalid
    token_number = IntField(default=0)
    annual_income = FloatField(required=True)
    cash_invested = FloatField(required=True)
    perc_contribution = FloatField(required=True)
    employer_contribution = FloatField(required=True)
    target_amount = FloatField(requied=True)

    meta = {
        'indexes': [
            {
                # Ensure uniqueness for contact_email
                'fields': ['contact_email'],
                'unique': True
            }
        ]
    }

    # Method
    def method(self):
        print("this is a method")

# Async function to create a new customer


async def create_account(account_data):

    try:
        # Hash the password - the result will be {status, data}

        print(account_data)
        hashed_password_result = hash_string_bcrypt(
            account_data['plain_password'])

        # If the hash failed stop and return - don't store plain
        if hashed_password_result['status'] == False:
            return {"status": False, "data": None, "message": "password invalid"}

        # The hash result is ok, change value in dictionary to be unpacked into DB
        # Assign new key
        account_data['hashed_password'] = hashed_password_result['data']

        # Remove old key - catch the error in case it doesnt exist
        try:
            del account_data['plain_password']
        except:
            print("LOG - Customer Password Plain not found for deletion")
            pass

        account_doc = sAccount(**account_data)
        account_doc.save()  # Save the customer document to MongoDB
        print(f"Account created: {account_data}")

        return {"status": True, "data": account_doc.to_mongo(), "message": None}

    except NotUniqueError:
        # Handle unique constraint violation on contact_email
        existing_account = sAccount.objects(
            contact_email=account_data['contact_email']).first()
        if existing_account:
            return {
                "status": False,
                "data": None,
                "message": "User already exists with email",
                "safe_message": "There is already a user with that email address. Are you sure you don't already have an account?"
            }

    except Exception as e:
        # Handle any other unexpected exceptions
        print(f"An unexpected error occurred: {e}")
        return {"status": False, "data": None, "message": f"An unexpected error occurred: {e}"}


async def find_account_doc_by_email(email_addr: str):
    account = sAccount.objects(contact_email=email_addr).first()

    if not account:
        return False

    return account


async def find_account_doc_by_account_id(account_fid: str):
    account = sAccount.objects(account_fid=account_fid).first()

    if not account:
        return False

    return account
