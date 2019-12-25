from marshmallow import Schema, fields


class IngredientMeasurementSchema(Schema):
   id = fields.Int(dump_only=True)
   measurement = fields.Str()
   description = fields.Str()


class IngredientSchema(Schema):
   id = fields.Int(dump_only=True)
   name = fields.Str()
   default_measurement = fields.Nested(IngredientMeasurementSchema)


class RecipeDirectionSchema(Schema):
   id = fields.Int(dump_only=True)
   recipe_id = fields.Int()
   order = fields.Int()
   text = fields.Str()


class RecipeIngredientSchema(Schema):
   id = fields.Int(dump_only=True)
   recipe_id = fields.Int()
   amount = fields.Int()

   ingredient = fields.Nested(IngredientSchema)
   mesurement = fields.Nested(IngredientMeasurementSchema)


class RecipeSchema(Schema):
   id = fields.Int(dump_only=True)
   name = fields.Str()
   description = fields.Str()
   image_url = fields.Str(data_key='imageUrl')
   prep_time = fields.Int(data_key='prepTime')
   cook_time = fields.Int(data_key='cookTime')
   servings = fields.Int()

   directions = fields.Nested(RecipeDirectionSchema(many=True))
   ingredients = fields.Nested(RecipeIngredientSchema(many=True))
