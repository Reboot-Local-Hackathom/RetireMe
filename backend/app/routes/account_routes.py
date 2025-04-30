from fastapi import APIRouter, HTTPException, Request

from app.models.pub.account_sign_up_schema import pSignUpData
from app.models.pub.account_sign_in_schema import pSignInData

from app.models.priv.account_model import create_account, find_account_doc_by_email

from app.helpers.login_helper import login_email_password
from app.helpers.token_helper import issue_jwt_access_token, verify_access_token

# from app.database import get_db
from app.env_settings import get_settings

router = APIRouter()

@router.post("/accounts/sign-up", tags=["signing up"])
async def account_sign_up(signUpInfo: pSignUpData):
    try:
        # Try to create the new customer
        acc_data = {
            "first_name": signUpInfo.first_name,
            "last_name": signUpInfo.last_name,
            "contact_email": signUpInfo.email_addr,
            # We know this is either 'person' or 'organisation' as validated by pydantic
            "plain_password": signUpInfo.password,
            "annual_income": signUpInfo.annual_income,
            "cash_invested": signUpInfo.cash_invested,
            "perc_contribution": signUpInfo.perc_contribution,
            "employer_contribution": signUpInfo.employer_contribution,
            "target_amount": signUpInfo.target_amount
        }

        new_account_result = await create_account(acc_data)
        print(new_account_result)
        # If failed
        if not new_account_result['status']:
            if new_account_result['safe_message']:
                raise HTTPException(
                    status_code=400, detail=new_account_result['safe_message'])
            else:
                raise HTTPException(
                    status_code=400, detail="Could not create new user")
        elif new_account_result and new_account_result['data']:
            # success
            print("DATA - ", new_account_result['data'])
            return [{"status": "success"},
                    {"message": f"Welcome to {get_settings().APP_NAME}"},
                    ]

        else:
            raise HTTPException(
                status_code=404, detail="There was a problem creating your account. If this persists, please get in touch.")

    except HTTPException as e:
        # Catch and raise any HTTP Exceptions we want to send
        raise e

    except Exception as e:
        print(e)
        # Even if it is a 500 really ;)
        raise HTTPException(status_code=400, detail="Bad request")
    


@router.post("/accounts/sign-in", tags=["signing in"])
async def customer_sign_up(signInInfo: pSignInData):
    try:
        email = signInInfo.email
        password_plain = signInInfo.password

        login_result = await login_email_password(email=email, password_plain=password_plain)
        print(login_result)

        if not (login_result['status'] and login_result['match']):
            raise HTTPException(status_code=401, detail='Login Unauthorized')

        else:
            # Email + Password OK
            found_account_result = login_result['account_document']
            if not found_account_result:
                raise HTTPException(status_code=401, detail="Not found")
            if not found_account_result['account_fid']:
                # If no ID - cannot generate token. Don't generate tokens with null values
                raise HTTPException(status_code=401, detail="Not found")

        # If we are here, the password check worked and the password is valid. Issue the access token

        access_token = issue_jwt_access_token(found_account_result)

        return ({"access_token": access_token})

    except HTTPException as e:
        raise e

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Bad request")
    

@router.post("/accounts/get-info", tags=["getting info"])
async def customer_sign_up(request: Request):

    try:
        access_token = request.headers['x-access-token']
    except Exception as e:
        raise HTTPException(status_code=400, detail="Provide access token")
    
    token_result = await verify_access_token(access_token)

    if not token_result['status'] or not token_result['account_doc']:
        raise HTTPException(status_code=401, detail="bad token")
    
    try:
        account_doc = token_result['account_doc']
        details = {} 
        details["annual_income"] = account_doc["annual_income"],
        details["cash_invested"] = account_doc["cash_invested"],
        details["perc_contribution"] = account_doc["perc_contribution"],
        details["employer_contribution"] = account_doc["employer_contribution"],
        details["target_amount"] = account_doc["target_amount"]
    

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="error fetching details")
    
    return({"details": details})
    

    
    



