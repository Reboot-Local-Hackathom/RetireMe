import jwt
import datetime
from app.env_settings import get_settings

from app.models.priv.account_model import find_account_doc_by_account_id


def verify_token_priv_key(token, secret_key):
    try:
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])

        # If no error, the token was decoded okay with signature verified
        return ({"status": True, "message": "OK", "data": payload})
    except jwt.ExpiredSignatureError:
        return ({"status": False, "message": "expired"})
    except jwt.InvalidTokenError:
        return ({"status": False, "message": "invalid"})


def issue_jwt_priv_key(payload, secret_key):
    token = jwt.encode(payload=payload, key=secret_key)
    return (token)


def issue_jwt_access_token(account_document):
    secret_key = get_settings().JWT_PRIV_KEY

    account_document['token_number'] = account_document['token_number'] + 1
    # Mongoengine standard is blocking so no need to worry about awaiting
    account_document.save()

    # Define the payload (the claims part of the token)
    payload = {
        "account_id": str(account_document['account_fid']),
        "token_number": account_document['token_number']
    }

    # Get the current UTC time (timezone-aware)
    now_utc = datetime.datetime.now(datetime.timezone.utc)
    # Add 1 hour to the current UTC time
    expiry_time = now_utc + datetime.timedelta(hours=1)

    # Issued At time (timezone-aware) - as int unix time
    payload['iat'] = now_utc
    payload['exp'] = expiry_time  # Expiry time - as int unix time

    token = jwt.encode(payload=payload, key=secret_key)

    return (token)


async def verify_access_token(token):
    try:
        secret_key = get_settings().JWT_PRIV_KEY
        payload = jwt.decode(
            token, secret_key, algorithms=['HS256'])

        print("GOT HERE BELOW")

        # Find the user customer document, verify the token number
        # if this is a key-error, we'll throw here and catch in in the except below
        account_fid = payload["account_id"]

        accont_doc = await find_account_doc_by_account_id(account_fid)

        if not accont_doc:
            raise Exception("Cannot find customer")

        assert payload["token_number"] == accont_doc["token_number"]

        # If no error, the token was decoded okay with signature verified
        return ({"status": True, "message": "OK", "account_doc": accont_doc})
    except jwt.ExpiredSignatureError:
        return ({"status": False, "message": "expired"})
    except jwt.InvalidTokenError:
        print("HERE")
        return ({"status": False, "message": "invalid"})
    except Exception as e:
        print("ERROR:", e)
        return ({"status": False, "message": "invalid"})
