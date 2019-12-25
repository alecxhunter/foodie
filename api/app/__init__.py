from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from marshmallow import ValidationError, pprint

from config import app_config

db = SQLAlchemy()

from app import schemas
ingredients_schema = schemas.IngredientSchema(many=True)
ingredient_measurements_schema = schemas.IngredientMeasurementSchema(many=True)
recipe_schema = schemas.RecipeSchema()
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
   @app.route('/recipes', methods=['GET', 'POST'])
   def recipes_api():
      if request.method == 'GET':
         recipes = models.Recipe.query.all()
         return jsonify(recipes_schema.dump(recipes))
      elif request.method == 'POST':
         json_data = request.get_json()
         if not json_data:
            return jsonify({'message': 'No data provided!'}), 400
         
         try:
            data = recipe_schema.load(json_data)
         except ValidationError as err:
            return err.messages, 422

         pprint(data)

         recipe = models.Recipe(
            name=data['name'],
            description=data['description'],
            image_url=data['image_url'],
            prep_time=data['prep_time'],
            cook_time=data['cook_time'],
            servings=data['servings']
         )
         db.session.add(recipe)
         db.session.commit()

         for direction in data['directions']:
            recipe_direction = models.RecipeDirection(order=direction['order'], text=direction['text'], recipe=recipe)
            db.session.add(recipe_direction)
            db.session.commit()

         for ingredient in data['ingredients']:
            recipe_ingredient = models.RecipeIngredient(
               ingredient_id=ingredient['ingredient_id'],
               amount=ingredient['amount'],
               measurement_id=ingredient['measurement_id'],
               recipe=recipe
            )
            db.session.add(recipe_ingredient)
            db.session.commit()

         res = recipe_schema.dump(models.Recipe.query.get(recipe.id))
         return jsonify({'message': 'Created new recipe', 'recipe': res})

   return app
