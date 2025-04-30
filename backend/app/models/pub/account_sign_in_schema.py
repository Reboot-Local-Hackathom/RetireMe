from pydantic import BaseModel, EmailStr

class pSignInData(BaseModel):
    email: EmailStr  # required
    password: str # auth (in future)

