from database import database

def create(name, desc, short_desc, prep_time, cook_time, servings, created_by):
    insert_stmt = (
        "INSERT INTO recipes (name, description, short_description, prep_time, cook_time, servings, created_by) "
        "VALUES (%s, %s, %s, %d, %d, %d, %d)"
    )
    data = (name, desc, short_desc, prep_time, cook_time, servings, created_by)
    database.execute(insert_stmt, data)


def all():
    return database.execute("SELECT * FROM recipes")
