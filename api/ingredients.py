from database import database

def create(name, default_measurement=None):
   insert_stmt = (
      "INSERT INTO ingredients (name, default_measurement) "
      "VALUES (%s, %s)"
   )
   data = (name, default_measurement)
   database.execute(insert_stmt, data)

def all():
   return database.select("SELECT * FROM ingredients")
