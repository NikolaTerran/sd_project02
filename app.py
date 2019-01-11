import os

from flask import Flask, redirect, render_template, request, session, flash, url_for

from util import userMethods

app = Flask(__name__)
app.secret_key = os.urandom(35)

@app.route('/')
def main():
    print(session)
    if 'login' in session:
        print(session['login'])
        return render_template("main.html",
                                username=session['login'])
    else:
        return render_template("landing_page.html")

@app.route('/login', methods = ["POST", "GET"])
def login():
    if (request.method == "POST"):
        username = request.form['username']
        password = request.form['password']
        success, msg = userMethods.checkInfo(username, password)
        flash(msg)
        if success:
            session['login'] = username
            return redirect(url_for('main'))
        else:
            return render_template("login.html")
    else:
        return render_template("login.html")

@app.route('/register', methods = ["POST", "GET"])
def register():
    if (request.method == "POST"):
        username = request.form['username']
        password = request.form['password']
        passconf = request.form['passconf']
        success, msg = userMethods.createAccount(username, password, passconf)
        flash(msg)
        if success:
            return redirect(url_for('login'))
        else:
            return render_template("register.html")
    return render_template("register.html")

app.debug=True
app.run()
