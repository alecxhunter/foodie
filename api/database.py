import mysql.connector

class Database:
    def __init__(self):
        self.connection = mysql.connector.connect(user='admin', password='Doyouknow0',
                                                  host='127.0.0.1',
                                                  database='foodie')

    
    def getCursor(self):
        return self.connection.cursor(dictionary=True)

    def select(self, query):
        cur = self.getCursor()
        cur.execute(query)
        return cur.fetchall()

    def execute(self, query, data=None):
        cur = self.getCursor()
        cur.execute(query, data)

database = Database()