from marshmallow import Schema, fields


class IngredientMeasurementSchema(Schema):
   id = fields.Int(dump_only=True)
   measurement = fields.Str(required=True)
   description = fields.Str(required=True)


class IngredientSchema(Schema):
   id = fields.Int(dump_only=True)
   name = fields.Str(required=True)
   default_measurement = fields.Nested(IngredientMeasurementSchema)


class RecipeDirectionSchema(Schema):
   id = fields.Int(dump_only=True)
   recipe_id = fields.Int()
   order = fields.Int(required=True)
   text = fields.Str(required=True)


class RecipeIngredientSchema(Schema):
   id = fields.Int(dump_only=True)
   recipe_id = fields.Int(data_key='recipeId')
   amount = fields.Int(required=True)
   ingredient_id = fields.Int(required=True, data_key='ingredientId')
   measurement_id = fields.Int(required=True, data_key='measurementId')

   ingredient = fields.Nested(IngredientSchema)
   measurement = fields.Nested(IngredientMeasurementSchema)


class RecipeSchema(Schema):
   id = fields.Int(dump_only=True)
   name = fields.Str(required=True)
   description = fields.Str(required=True)
   image_url = fields.Str(required=True, data_key='imageUrl')
   prep_time = fields.Int(required=True, data_key='prepTime')
   cook_time = fields.Int(required=True, data_key='cookTime')
   servings = fields.Int(required=True)

   directions = fields.Nested(required=True, RecipeDirectionSchema(many=True))
   ingredients = fields.Nested(required=True, RecipeIngredientSchema(many=True))
