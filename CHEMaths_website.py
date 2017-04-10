# -*- coding: utf-8 -*-
"""Web version for CHEMaths"""
from flask import Flask, jsonify, render_template, request, redirect
from latex_parser import latex2chem, latex_valid
from CHEMaths import smart_calculate, process_and_balance_equation, get_ratio, Alkane

app = Flask(__name__)


@app.route("/")
def home():
    """renders home page of CHEMaths"""
    return render_template('index.html', name="homepage")


@app.route("/live_preview", methods=['POST'])
def live_process():
    """processes input dynamically"""
    mode = request.values.get('mode', None)
    latex = request.values.get('latex', None)
    if mode == 'molecule':
        pass
    elif mode == 'equation':
        result = process_and_balance_equation(
            latex,
            parser=latex2chem,
            regex=True,
            split_token=(r"[eA-Z][_A-Za-z\d]*(?:\^\{?\d*[\+-]\}?)?", '\\rightarrow '),
            return_string=False
        )
        reactants, products, coefficients, error = None, None, None, None
        try:
            reactants, products, coefficients = result
        except ValueError:  # too many values to unpack
            error = result
        else:
            coefficients = [
                fr'\frac{{{fraction.numerator}}}{{{fraction.denominator}}}' for fraction in coefficients
            ]  # encode fractions in json
        return jsonify({
            'reactants': reactants,
            'products': products,
            'coefficients': coefficients,
            'error': error
        })
    return jsonify({'result': latex2chem(latex)})


@app.route("/results", methods=['POST'])
def process():
    """processes input from home page and redirect to result tab"""

    return render_template('index.html', name="homepage")
    # return redirect('index.html', code=302, Response=None)  # TODO render results

if __name__ == "__main__":
    app.run()
