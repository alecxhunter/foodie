from marshmallow import Schema, ValidationError, fields, validate


def not_empty(data):
   if not data:
      raise ValidationError('Field is empty')


class IngredientMeasurementSchema(Schema):
   id = fields.Int(dump_only=True)
   measurement = fields.Str(required=True, validate=not_empty)
   description = fields.Str(required=True, validate=not_empty)


class IngredientSchema(Schema):
   id = fields.Int(dump_only=True)
   name = fields.Str(required=True, validate=not_empty)
   default_measurement = fields.Nested(IngredientMeasurementSchema)


class RecipeDirectionSchema(Schema):
   id = fields.Int(dump_only=True)
   recipe_id = fields.Int()
   order = fields.Int(required=True)
   text = fields.Str(required=True, validate=not_empty)


class RecipeIngredientSchema(Schema):
   id = fields.Int(dump_only=True)
   recipe_id = fields.Int(data_key='recipeId')
   amount = fields.Int(
      required=True
      , validate=[
         not_empty
         , validate.Range(min=0, min_inclusive=False, error='Must be greater than 0')
      ]
   )
   ingredient_id = fields.Int(
      required=True
      , data_key='ingredientId'
      , validate=validate.Range(min=1, error='Invalid ingredient')
   )
   measurement_id = fields.Int(required=True, data_key='measurementId')

   ingredient = fields.Nested(IngredientSchema)
   measurement = fields.Nested(IngredientMeasurementSchema)


class RecipeSchema(Schema):
   id = fields.Int(dump_only=True)
   name = fields.Str(
      required=True,
      validate=not_empty
   )
   description = fields.Str(required=True, validate=not_empty)
   image_url = fields.Str(
      required=True,
      data_key='imageUrl',
      validate=validate.URL(relative=False)
   )
   prep_time = fields.Int(
      required=True,
      data_key='prepTime',
      validate=validate.Range(min=1, error='Must be at least 1')
   )
   cook_time = fields.Int(
      required=True,
      data_key='cookTime',
      validate=validate.Range(min=1, error='Must be at least 1')
   )
   servings = fields.Int(
      required=True,
      validate=validate.Range(min=1, error='Must be at least 1')
   )

   directions = fields.Nested(RecipeDirectionSchema(many=True), required=True, validate=validate.Length(min=1, error='Must have at least one direction'))
   ingredients = fields.Nested(RecipeIngredientSchema(many=True), required=True, validate=validate.Length(min=1, error='Must have at least one ingredient'))
