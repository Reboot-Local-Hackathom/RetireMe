import bcrypt

def hash_string_bcrypt(tohash):
    try:
        hashed_str = bcrypt.hashpw(tohash.encode('utf-8'), bcrypt.gensalt())
        return({"status":True, "data": hashed_str})

    except:
        return({"status":False, "message":"hash failed"})
    
def validate_password_bcrypt(provided_password_plain, hashed_password):
    try:
        if bcrypt.checkpw(provided_password_plain.encode('utf-8'), hashed_password.encode('utf-8'),): # Convert the string hash to bytes
            return({"status":True, "match":True})
        else:
            return({"status":True, "match":False})
    except Exception as e:
        print(e)
        # There was some error
        return({"status":False, "match":False})
