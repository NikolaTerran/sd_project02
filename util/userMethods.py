import sqlite3

def create():
    db = sqlite3.connect("data/MUD.db")
    c = db.cursor()
    '''user info table'''
    c.execute("""CREATE TABLE IF NOT EXISTS users(
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                password TEXT,
                )"""
                )
    db.commit()
    db.close()


def checkInfo(user, pswd):

    '''This method checks if the user and password combination
    is a valid one, and returns error messages accordingly'''

    db = sqlite3.connect("data/MUD.db")
    c = db.cursor()
    #Looks for the password of the inputted user
    for i in c.execute("SELECT password FROM users WHERE username = ?",(user,)):
         #If user is found and passwords match
        if i[0] == pswd:
            return "Login Successful"
         #If passwords don't match
        else:
            db.close()
            return "Incorrect Password"
    else:
        #If the user doesn't exist in the table
        db.commit()
        db.close()
        return "User not found"

def createAccount(user,pswd,passConf):

    '''This method checks the user's input when creating an acc
    to make sure they did not err anywhere in the process. If everything
    is correct, then the account will be created.'''

    db = sqlite3.connect("data/MUD.db")
    c = db.cursor()
    #checks if the username already exists
    for i in c.execute("SELECT username FROM users WHERE username = ?",(user,)):
        db.close()
        return "Username already exists"
    else:
        #if password confirmation fails
        if pswd != passConf:
            db.close()
            return "Passwords do not match"
        #if password confirmation succeeds add the user to the database
        userdb="INSERT INTO userInfo(username, password) VALUES( ?, ?)"
        c.execute(userdb,(user,pswd,"",""))
        db.commit()
        db.close()
        return "Account creation successful"
