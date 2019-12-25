from app import db


class Ingredient(db.Model):
   __tablename__ = 'ingredients'

   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(60), index=True, unique=True)
   measurement_id = db.Column(db.Integer, db.ForeignKey('ingredient_measurements.id'))

   #default_measurement = db.relationship('IngredientMeasurement', backref="ingredients")
   recipe_ingredients = db.relationship('RecipeIngredient', backref='ingredient')

   def __repr__(self):
      return f'<Ingredient {self.name}>'


class IngredientMeasurement(db.Model):
   __tablename__ = 'ingredient_measurements'

   id = db.Column(db.Integer, primary_key=True)
   measurement = db.Column(db.String(8), index=True)
   description = db.Column(db.String(60), index=True)

   ingredients = db.relationship('Ingredient', backref='default_measurement')
   recipe_ingredient_measurement = db.relationship('RecipeIngredient', backref='measurement')

   def __repr__(self):
      return f'<IngredientMeasurement {self.description} ({self.measurement})>'


class Recipe(db.Model):
   __tablename__ = 'recipes'

   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(200), index=True)
   description = db.Column(db.String(2000))
   image_url = db.Column(db.String(200))
   prep_time = db.Column(db.Integer)
   cook_time = db.Column(db.Integer)
   servings = db.Column(db.Integer)

   directions = db.relationship('RecipeDirection', backref='recipe')
   ingredients = db.relationship('RecipeIngredient', backref='recipe')

   def __repr__(self):
      return f'<Recipe id: {self.id} name: {self.name}>'


class RecipeDirection(db.Model):
   __tablename__ = 'recipe_directions'

   id = db.Column(db.Integer, primary_key=True)
   recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
   order = db.Column(db.Integer)
   text = db.Column(db.String(1000))

   def __repr__(self):
      return f'<RecipeDirection recipe_id: {self.recipe_id} text: {self.text}>'


class RecipeIngredient(db.Model):
   __tablename__ = 'recipe_ingredients'

   id = db.Column(db.Integer, primary_key=True)
   recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))
   ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))
   amount = db.Column(db.Integer)
   measurement_id = db.Column(db.Integer, db.ForeignKey('ingredient_measurements.id'))

   #ingredient = db.relationship('Ingredient', backref='recipe_ingredients')
   #measurement = db.relationship('IngredientMeasurement', backref='recipe_ingredients')

   def __repr__(self):
      return f'<RecipeIngredient recipe_id: {self.recipe_id} ingredient_id: {self.ingredient_id} amount: {self.amount}>'
