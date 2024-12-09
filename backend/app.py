from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Initialize SQLite database
DATABASE = 'workers.db'

def init_db():
    with sqlite3.connect(DATABASE) as conn: # conn is the mechanism wich connects to the database
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS operations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                worker_name TEXT NOT NULL,  
                operation_time INTEGER NOT NULL
        )
    ''')
    conn.commit()

init_db()

# API to add an operation
@app.route('/operation', methods=['POST'])
def add_operation():
    data = request.get_json()
    worker_name = data.get('worker_name')
    operation_time = data.get('operation_time')

    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO operations (worker_name, operation_time)
            VALUES (?, ?)
    ''', (worker_name, operation_time))
        conn.commit()
        return jsonify({"id": cursor.lastrowid}), 201
    
# API to fetch all operations
@app.route('/operations', methods=['GET'])
def get_operations():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM operations')
        rows = cursor.fetchall()
        return jsonify(rows), 200
    
# Run the server
if __name__ == '__main__':
    app.run(debug=True)