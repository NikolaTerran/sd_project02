#Team PythonScript
#Tianrun Liu (PM)
#Tim Marder
#Bo Lu
#Brian Lee
#SoftDev1 Pd06

import json
import urllib
import random
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
    if session.get('username'):
        return redirect(url_for("profile"))
    else:
        return redirect(url_for("login"))


@app.route("/login", methods = ["POST", "GET"])
def login():
    return render_template("login.html")


@app.route("/auth", methods = ["POST"])
def auth():
    if userMethods.checkInfo(request.form['username'], request.form['password']):
        session['username'] = request.form['username']
        flash("Welcome " + session['username'] + "! You have successfully logged in.")
        return redirect(url_for("profile"))
    else:
        flash("Your login credentials were incorrect.")
        return redirect(url_for("login"))


@app.route("/register", methods = ["POST", "GET"])
def register():
    return render_template("register.html")


@app.route("/regauth", methods = ["POST"])
def regauth():
    if not request.form['password'] == request.form['password2']:
        flash("Your passwords do not match")
        return redirect(url_for("register"))
    if userMethods.createAccount(request.form['username'], request.form['password'], request.form['password2']):
        flash("You have successfully created an account")
        return redirect(url_for("login"))
    flash("The username you entered is taken.")
    return redirect(url_for("register"))


@app.route("/logout", methods=["POST", "GET"])
def logout():
    try:
        session.pop('username')
        flash("You have successfully logged out")
        return redirect(url_for("login"))
    except:
        flash("You have successfully logged out")
        return redirect(url_for("login"))


@app.route("/profile", methods=["POST", "GET"])
def profile():
    return render_template("profile.html", title = "Mykolyk's Ultimate Dictionary", user = session.get('username'))

app.debug=True
app.run()
