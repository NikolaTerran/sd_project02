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
    if not (user and pswd):
        return (False, "One or more fields missing")

    db = sqlite3.connect("data/MUD.db")
    c = db.cursor()
    #Looks for the password of the inputted user
    for i in c.execute("SELECT password FROM users WHERE username = ?",(user,)):
         #If user is found and passwords match
        if i[0] == pswd:
            return (True, "Login Successful")
         #If passwords don't match
        else:
            db.close()
            return (False, "Incorrect Password")
    else:
        #If the user doesn't exist in the table
        db.commit()
        db.close()
        return (False, "Username not found")

def createAccount(user,pswd,passConf):

    '''This method checks the user's input when creating an acc
    to make sure they did not err anywhere in the process. If everything
    is correct, then the account will be created.'''
    if not (user and pswd and passConf):
        return (False, "One or more fields missing")

    db = sqlite3.connect("data/MUD.db")
    c = db.cursor()
    #checks if the username already exists
    for i in c.execute("SELECT username FROM users WHERE username = ?",(user,)):
        db.close()
        return (False, "Username already exists")
    else:
        #if password confirmation fails
        if pswd != passConf:
            db.close()
            return (False, "Passwords do not match")
        #if password confirmation succeeds add the user to the database
        command = "INSERT INTO users(username, password) VALUES( ?, ?)"
        c.execute(command, (user, pswd))
        db.commit()
        db.close()
        return (True, "Account creation successful")
'''
def updateIQ_Level(userId,iq,level):

    'This method updates the game_state table with given values of IQ and level.
    These values cannot decrease, thus there will be an error check for that.'

    db = sqlite3.connect("data/MUD.db")
    c = db.cursor()
    command = "UPDATE game_state(iq, "

    #checks if iq and level are below the current iq and level - which we don't want
    for i in c.execute("SELECT iq FROM game_state WHERE user_id = ?",(userId,)):
        if iq < i[0]:
            db.close()
            return (False, "A lower iq may not be inputted")
        else:
            return "bleh"

    for i in c.execute("SELECT level FROM game_state WHERE user_id = ?",(userId,)):
        if level < i[0]:
            db.close()
            return (False, "A lower level may not be inputted")

        else:
            return "bleh"
'''
