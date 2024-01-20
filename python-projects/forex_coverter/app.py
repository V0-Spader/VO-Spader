from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from fxconverter import ForexConverter

app = Flask(__name__)

app.config["SECRET_KEY"] = "fxconverter"

app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

debug = DebugToolbarExtension(app)

@app.route("/")
def start():
    """This function renders the form for the forex converter"""
    return render_template("index.html")

@app.route("/fx_converter")
def convert():
    """This function flashes a message in the html showing the status of the conversion"""
    convert_from = request.args["from"]
    convert_to = request.args["to"]
    try:
        amount = float(request.args["amount"])
    except ValueError:
        amount = request.args["amount"]
    msg = None

    forex_converter = ForexConverter(convert_from, convert_to, amount)
    msg = forex_converter.conversion_check()

    flash(msg)

    return redirect("/")