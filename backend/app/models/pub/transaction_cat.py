from pydantic import BaseModel, EmailStr

class pTransactionCat(BaseModel):
    transaction_id: str
    new_category: str

