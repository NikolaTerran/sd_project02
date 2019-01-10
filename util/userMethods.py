#PythonScript
#Tianrun Liu, Brian Lee, Tim Marder, Bo Hui Lu
#Softdev1 pd6
#Project 2 - The End

import sqlite3

def create():
    db = sqlite3.connect("data/MUD.db")
    c = db.cursor()
    '''user info table'''
    c.execute("""CREATE TABLE IF NOT EXISTS users(
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                password TEXT
                )"""
                )
    c.execute("""CREATE TABLE IF NOT EXISTS game_state(
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                iq INTEGER,
                level INTEGER
                )"""
                )

    c.execute("""CREATE TABLE IF NOT EXISTS words(
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                word TEXT
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


def updateIQ_Level(userId,iq,level):

    '''This method updates the game_state table with given values of IQ and level.
    These values cannot decrease, thus there will be an error check for that.'''

    db = sqlite3.connect("data/MUD.db")
    c = db.cursor()

    for i in c.execute("SELECT iq FROM game_state WHERE user_id = ?",(userId,)):
        if iq < i[0]:
            return "A lower iq may not be inputted"

        for i in c.execute("SELECT level FROM game_state WHERE user_id = ?",(level,)):
            if level < i[0]:
                return "A lower level may not be inputted"
            return "bleh, will finish later"

    