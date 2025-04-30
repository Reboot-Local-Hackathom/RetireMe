"""
This defines an account
"""
import random
from datetime import datetime
from mongoengine import Document, StringField, DateTimeField, BooleanField, IntField, NotUniqueError, FloatField, UUIDField
import uuid
from app.env_settings import get_settings
from app.helpers.hashing_helper import hash_string_bcrypt


class sTransaction(Document):
    # Unique constraint on contact_email
    time = DateTimeField(
        default=datetime.utcnow, required=True)  # Creation timestamp
    account_fid = UUIDField(binary=False, required=True)
    # This is to make sure that if a token is re-issued, all older access tokens are rendered invalid
    reference = StringField(required=True, default=lambda: random.choice(['food', 'taxi', 'bus', 'friends']))
    payee = StringField(required=True, default=lambda: random.choice(['Rehman', 'Alex', 'Sarah', 'Jordy']))
    category = StringField(required=True, default="Uncategorized")

    meta = {
        'indexes': [
            {
                # Ensure uniqueness for contact_email
                'fields': ['account_fid'],
                'unique': False
            }
        ]
    }

    # Method
    def method(self):
        print("this is a method")

# Async function to create a new customer


async def create_transaction(account_fid):

    try:
   
        print("PUTTING THAT IN")
        trans_doc = sTransaction(account_fid=account_fid)
        trans_doc.save()  # Save the customer document to MongoDB
        print(f"Transaction created: {trans_doc}")

        return {"status": True, "data": trans_doc.to_mongo(), "message": None}

    

    except Exception as e:
        # Handle any other unexpected exceptions
        print(f"An unexpected error occurred: {e}")
        return {"status": False, "data": None, "message": f"An unexpected error occurred: {e}"}

async def find_transactions_by_account_id(account_fid: str):
    trans = sTransaction.objects(account_fid=account_fid)

    if not trans:
        return False

    return trans
