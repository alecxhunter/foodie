from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import app_config

db = SQLAlchemy()

from app import schemas
ingredients_schema = schemas.IngredientSchema(many=True)
ingredient_measurements_schema = schemas.IngredientMeasurementSchema(many=True)
recipes_schema = schemas.RecipeSchema(many=True)

def create_app(config_name):
   app = Flask(__name__, instance_relative_config=True)
   app.config.from_object(app_config[config_name])
   app.config.from_pyfile('config.py')
   db.init_app(app)
   cors = CORS(app)
   migrate = Migrate(app, db)

   from app import models

   @cross_origin()
   @app.route('/ingredients', methods=['GET'])
   def ingredients_api():
      if request.method == 'GET':
         ingredients = models.Ingredient.query.all()
         return jsonify(ingredients_schema.dump(ingredients))
   
   @cross_origin()
   @app.route('/ingredientMeasurements', methods=['GET'])
   def ingredient_measurements_api():
      if request.method == 'GET':
         ingredient_measurements = models.IngredientMeasurement.query.all()
         return jsonify(ingredient_measurements_schema.dump(ingredient_measurements))

   @cross_origin()
   @app.route('/recipes', methods=['GET'])
   def recipes_api():
      if request.method == 'GET':
         recipes = models.Recipe.query.all()
         return jsonify(recipes_schema.dump(recipes))

   return app
