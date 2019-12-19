from database import database
from flask import jsonify

def create(data):
   name = data['name']
   desc = data['description']
   image_url = data['image']
   prep_time = data['prepTime']
   cook_time = data['cookTime']
   servings = data['servings']
   created_by = 0 #request.args.get('createdBy', 0)
   directions = data['directions']
   ingredients = data['ingredients']

   insert_stmt = (
      "INSERT INTO recipes (name, description, image_url, prep_time, cook_time, servings, created_by) "
      "VALUES (%s, %s, %s, %s, %s, %s, %s)"
   )
   data = (name, desc, image_url, prep_time, cook_time, servings, created_by)
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
   query = (
      "SELECT r.id, "
      "r.name, "
      "r.description, "
      "r.image_url, "
      "r.prep_time, "
      "r.cook_time, "
      "r.servings, "
      "r.created_by, "
      "GROUP_CONCAT(DISTINCT rd.text order by rd.`order` separator '**') as directions, "
      "GROUP_CONCAT(DISTINCT ri.ingredient_id, ';;', i.name, ';;', ri.measurement, ';;', ri.amount separator '**') as ingredients "
      "FROM recipes r "
      "LEFT JOIN recipe_directions rd  ON rd.recipe_id = r.id "
      "LEFT JOIN recipe_ingredients ri  ON ri.recipe_id = r.id "
      "LEFT JOIN ingredients i ON i.id = ri.ingredient_id "
      "GROUP BY r.id"
   )
   rows = database.select(query)
   recipes = []
   for row in rows:
      recipe = {}
      recipe['id'] = row['id']
      recipe['name'] = row['name']
      recipe['description'] = row['description']
      recipe['image'] = row['image_url']
      recipe['prepTime'] = row['prep_time']
      recipe['cookTime'] = row['cook_time']
      recipe['servings'] = row['servings']
      recipe['createdBy'] = row['created_by']
      recipe['directions'] = [] if row['directions'] is None else row['directions'].split('**')

      ingredients = []
      for ingr in [] if row['ingredients'] is None else row['ingredients'].split('**'):
         if ingr is None:
            continue
         fields = ingr.split(';;')
         ingredient = {}
         ingredient['id'] = fields[0]
         ingredient['name'] = fields[1]
         ingredient['measurement'] = fields[2]
         ingredient['amount'] = fields[3]
         ingredients.append(ingredient)

      recipe['ingredients'] = ingredients
      recipes.append(recipe)

   return recipes
