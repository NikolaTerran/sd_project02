#Team PythonScript
#Tianrun Liu (PM)
#Tim Marder
#Bo Lu
#Brian Lee
#SoftDev1 Pd06

import os
import ssl

from flask import Flask, render_template, session, request, url_for, redirect, flash

from util import userMethods


if (not os.environ.get('PYTHONHTTPSVERIFY', '') and
    getattr(ssl, '_create_unverified_context', None)):
    ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route('/')
def main():
    if 'username' in session:
        return redirect(url_for("profile"))
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
        return redirect(url_for("login"))
    except:
        flash("You must be logged in to logout.", 'danger')
        return redirect(url_for("login"))

@app.route("/profile", methods=["POST", "GET"])
def profile():
    return render_template("profile.html", title = "Mykolyk's Ultimate Dictionary", user = session.get('username'))

@app.route("/game", methods=["POST","GET"])
def game():
	return render_template("game.html");

@app.route("/add/<username>/<word>")
def add_word(username, word):
    pass

app.debug=True
app.run()
