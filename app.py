#Team PythonScript
#Tianrun Liu (PM)
#Tim Marder
#Bo Lu
#Brian Lee
#SoftDev1 Pd06

import os

from flask import Flask, render_template, session, request, url_for, redirect, flash

from util import userMethods

app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route('/')
def main():
    if 'username' in session:
        return render_template("profile.html", user = session.get('username'))
    else:
        return redirect(url_for("login"))

@app.route('/login', methods = ["POST", "GET"])
def login():
    if (request.method == "POST"):
        username = request.form['username']
        password = request.form['password']
        success, msg = userMethods.checkInfo(username, password)
        if success:
            flash(msg, 'success')
            session['username'] = username
            return redirect(url_for('main'))
        else:
            flash(msg, 'danger')
            return render_template("login.html")
    else:
        return render_template("login.html")

@app.route('/register', methods = ["POST", "GET"])
def register():
    if (request.method == "POST"):
        username = request.form['username']
        password = request.form['password']
        passConf = request.form['passConf']
        success, msg = userMethods.createAccount(username, password, passConf)
        if success:
            flash(msg, 'success')
            return redirect(url_for('login'))
        else:
            flash(msg, 'danger')
            return render_template("register.html")
    return render_template("register.html")

@app.route("/logout", methods=["POST", "GET"])
def logout():
    try:
        session.pop('username')
        flash("You have successfully logged out", 'success')
    except:
        flash("You must be logged in to logout.", 'danger')
    return redirect(url_for("login"))

@app.route("/game", methods=["GET"])
def game():
    if "username" in session:
        return render_template("game.html");
    else:
        flash("You must be logged in to play the game.", 'danger')
        return redirect(url_for("login"));

app.debug=True
app.run()
