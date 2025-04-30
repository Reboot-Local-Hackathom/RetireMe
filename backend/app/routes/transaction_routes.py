from fastapi import APIRouter, HTTPException, Request

from app.models.pub.account_sign_up_schema import pSignUpData
from app.models.pub.account_sign_in_schema import pSignInData

from app.models.priv.account_model import create_account, find_account_doc_by_email
from app.models.priv.transactions_model import find_transactions_by_account_id, create_transaction

from app.helpers.login_helper import login_email_password
from app.helpers.token_helper import issue_jwt_access_token, verify_access_token

# from app.database import get_db
from app.env_settings import get_settings
import random
router = APIRouter()


@router.post("/transactions/create")
async def create_transaction_end(request:Request):

    try:
        access_token = request.headers['x-access-token']
    except Exception as e:
        raise HTTPException(status_code=400, detail="Provide access token")
    
    token_result = await verify_access_token(access_token)
  
    if not token_result['status'] or not token_result['account_doc']:
        raise HTTPException(status_code=401, detail="bad token")
    
    try:

        account_doc = token_result['account_doc']
        account_fid = account_doc['account_fid']

        new_doc = await create_transaction(account_fid)

        print("HERE NEW DOC DONE")

    except Exception as e:
        print("ERROR")
        print(e)
        raise HTTPException(status_code=500, detail="error fetching transactions")
    
    return({"status": True})



@router.get("/transactions/my-transactions", tags=["getting transaction info"])
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
        account_fid = account_doc['account_fid']


        transactions = await find_transactions_by_account_id(account_fid)

        if not transactions:
            raise HTTPException(status_code=404, detail="no transactions found")


        out = []
        for transaction in transactions:
            trans_as_dict = trans_to_dict(transaction)
            if trans_as_dict:
                out.append(trans_as_dict)

        

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="error fetching transactions")
    
    return({"transactions": out})


def trans_to_dict(trans):
    try:
        d = {}

        d["time"] = trans["time"]
        d["payee"] = trans["payee"]
        d["reference"] = trans["reference"]
        return d
    except:
        return False