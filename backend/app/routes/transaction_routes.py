from fastapi import APIRouter, HTTPException, Request

from app.models.pub.transaction_cat import pTransactionCat


from app.models.priv.account_model import create_account, find_account_doc_by_email
from app.models.priv.transactions_model import find_transactions_by_account_id, create_transaction, update_transaction_by_transaction_id

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



    

@router.post("/transactions/update-category")
async def edit_transaction_cat(transInput: pTransactionCat, request:Request):
    
    try:
        access_token = request.headers['x-access-token']
    except Exception as e:
        raise HTTPException(status_code=400, detail="Provide access token")
    
    token_result = await verify_access_token(access_token)

  
    if not token_result['status'] or not token_result['account_doc']:
        raise HTTPException(status_code=401, detail="bad token")
    
    try:
        # Don't bother checking it's their transaction
        trans_id = transInput.transaction_id
        new_cat = transInput.new_category
    
        transaction_result = await update_transaction_by_transaction_id(trans_id, new_cat)

        if not transaction_result:
            raise Exception() # Trigger except catch and 500 back


    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="error updating transactions")
    
    return({"status": True})




def trans_to_dict(trans):
    try:
        d = {}

        d["time"] = trans["time"]
        d["payee"] = trans["payee"]
        d["reference"] = trans["reference"]
        d["amount"] = trans["amount"]
        d["category"] = trans["category"]
        d["transaction_id"] = trans["transaction_id"]
        return d
    except:
        return False