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
   image_url = fields.Str()
   prep_time = fields.Int()
   cook_time = fields.Int()
   servings = fields.Int()

   directions = fields.Nested(RecipeDirectionSchema)
   ingredients = fields.Nested(RecipeIngredientSchema)
