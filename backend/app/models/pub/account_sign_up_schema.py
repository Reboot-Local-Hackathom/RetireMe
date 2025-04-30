from pydantic import BaseModel, EmailStr, PositiveFloat

class pSignUpData(BaseModel):
    first_name: str  # required
    last_name: str
    email_addr: EmailStr   # required
    password: str
    annual_income: PositiveFloat
    cash_invested: PositiveFloat
    perc_contribution: PositiveFloat
    employer_contribution: PositiveFloat
    target_amount: PositiveFloat