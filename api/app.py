import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import ingredients
import recipes

app = flask.Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@cross_origin()
@app.route('/ingredients', methods=['GET', 'POST'])
def ingredients_api():
    if request.method == 'GET':
        return jsonify(ingredients.all())
    elif request.method == 'POST':
        name = request.args.get('name', '')
        default_measurement = request.args.get('default_measurement', None)
        return ingredients.create(name, default_measurement)

@cross_origin()
@app.route('/recipes', methods=['GET', 'POST'])
def recipes_api():
    if request.method == 'GET':
        return jsonify(recipes.all())

app.run()
