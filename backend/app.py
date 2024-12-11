from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app) # Enable cross-origin resource sharing for frontend-backend communication

DATABASE_URL = "postgresql://controlo_postgresql_manutencao_user:lg5lt4p7Nk6p3r7S77mURGa7ej8t224T@dpg-ctcm0jbtq21c73fsg8h0-a.oregon-postgres.render.com/controlo_postgresql_manutencao"

# Database Initialization
def init_db():
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    # Create a table if it doesnt exist 
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS maintenance_data (
            id SERIAL PRIMARY KEY,
            worker_name VARCHAR(255),
            machine VARCHAR(255),
            maintenance_type VARCHAR(255),
            operation_time INTEGER
        )
    """)
    
    conn.commit()
    conn.close()

init_db() # Initialize the database

# API Routes

# Save data (POST request)
@app.route('/save', methods=['POST'])
def save_data():
    data = request.get_json()
    try:
        worker_name = data.get('worker_name')
        machine = data.get('machine')
        maintenance_type = data.get('maintenance_type')
        operation_time = data.get('operation_time')

        # Save the data to the database
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO maintenance_data (worker_name, machine, maintenance_type, operation_time)
            VALUES(%s, %s, %s, %s)
        """, (worker_name, machine, maintenance_type, operation_time))
        
        conn.commit()
        conn.close()
        return jsonify({"message": "Data saved successfully!"}), 200
    except Exception as e:
        print("Error while saving data:", str(e))
        return jsonify({"message": "Failed to save data", "error": str(e)}), 500
    
# Retrieve data (GET request)
@app.route('/data', methods=['GET'])
def get_data():
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM maintenance_data")
    rows = cursor.fetchall()
    conn.close()

    # Format data as JSON
    data = [
        {
            "id": row[0],
            "worker_name": row[1],
            "machine": row[2],
            "maintenance_type": row[3],
            "operation_time": row[4],
        }
        for row in rows
    ]

    return jsonify(data)

@app.route('/')
def serve_index():
    return render_template('login.html')

@app.route('/<path:path>')
def serve_static(path):
    return render_template(path)
    
# Run the server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)