from database import database

def create(measurement, name):
   insert_stmt = (
   "INSERT INTO ingredient_measurements (measurement, name) "
   "VALUES (%s, %s)"
   )
   data = (measurement, name)
   database.execute(insert_stmt, data)

def all():
   return database.select("SELECT * FROM ingredient_measurements")
