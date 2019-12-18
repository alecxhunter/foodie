from database import database
from flask import jsonify

def create(data):
   name = data['name']
   desc = data['description']
   prep_time = data['prepTime']
   cook_time = data['cookTime']
   servings = data['servings']
   created_by = 0 #request.args.get('createdBy', 0)
   directions = data['directions']
   ingredients = data['ingredients']

   insert_stmt = (
      "INSERT INTO recipes (name, description, prep_time, cook_time, servings, created_by) "
      "VALUES (%s, %s, %s, %s, %s, %s)"
   )
   data = (name, desc, prep_time, cook_time, servings, created_by)
   database.execute(insert_stmt, data)
   recipe_id = database.lastrowid()

   insert_stmt = (
      "INSERT INTO recipe_directions (`recipe_id`, `order`, `text`) "
      "VALUES (%s, %s, %s)"
   )

   for idx, direction in enumerate(directions):
      data = (recipe_id, idx, direction)
      database.execute(insert_stmt, data)

   insert_stmt = (
      "INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount, measurement) "
      "VALUES (%s, %s, %s, %s)"
   )
   for ingredient in ingredients:
      data = (recipe_id, ingredient['id'], ingredient['amount'], ingredient['measurement'])
      database.execute(insert_stmt, data)

   database.commit()

   response = jsonify(
      #response=json.dumps(data),
      status=200,
      mimetype='application/json'
   )

   return response


def all():
   return database.execute("SELECT * FROM recipes")
