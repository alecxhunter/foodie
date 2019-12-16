import mysql.connector

class Database:
   def __init__(self):
      self.connection = mysql.connector.connect(user='admin', password='Doyouknow0',
                                                  host='127.0.0.1',
                                                  database='foodie')
      self.cursor = self.connection.cursor(dictionary=True)

   def select(self, query):
      self.cursor.execute(query)
      return self.cursor.fetchall()

   def execute(self, query, data=None):
      self.cursor.execute(query, data)

database = Database()
