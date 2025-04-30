from app.models.priv.account_model import find_account_doc_by_email
from app.helpers.hashing_helper import validate_password_bcrypt


async def login_email_password(email, password_plain):
    found_account_doc = await find_account_doc_by_email(email)

    if not found_account_doc:
        return ({"status": False, "match": False, "message": "Cannot find account with that email address. Are you sure that you entered it correctly?"})

    # Alternatively, use the get() method
    if not hasattr(found_account_doc, 'hashed_password'):
        # Something has gone wrong
        found_account_doc['needs_recovery'] = True
        found_account_doc.save()
        return ({"status": False, "match": False, "message": "Encountered an issue with account details"})

    # We have found a valid customer with that email address
    # Now CHECK THEIR PASSWORD to validate
    check_result = validate_password_bcrypt(
        provided_password_plain=password_plain, hashed_password=found_account_doc['hashed_password'])

    if not check_result['status']:
        # Something went wrong while checking the password
        # though report 404 to not give away that something has gone wrong
        return ({"status": False, "match": False, "message": "Encountered an issue with account details"})

    # We now know it worked so the result is valid
    if not check_result['match']:
        # password incorrect
        return ({"status": True, "match": False, "message": "Unauthorized"})

    else:
        # The password is valid
        return ({"status": True, "match": True, "message": "OK", "account_document": found_account_doc})

    # If we are here, the password check worked and the password is valid. Refresh the key.
