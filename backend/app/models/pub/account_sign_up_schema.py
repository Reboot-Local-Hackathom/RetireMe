from pydantic import BaseModel, EmailStr

class pSignUpData(BaseModel):
    first_name: str  # required
    last_name: str
    email_addr: EmailStr   # required
    password: str