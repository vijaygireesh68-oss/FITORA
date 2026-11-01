#!/usr/bin/env python3
"""
=============================================================================
FITORA — Elite Fitness & Nutrition Management System
Backend Server & SQLite Database Engine
=============================================================================
Built using Python 3 standard library (zero external pip packages required).
Includes embedded SQLite database for user biometrics, meals, water, and workouts.
"""

import os
import sys
import json
import sqlite3
import mimetypes
from urllib.parse import urlparse, parse_qs
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8000
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fitora.db")
STATIC_DIR = os.path.dirname(os.path.abspath(__file__))

def get_db_connection():
    """Create a thread-safe connection to the SQLite database."""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    """Initialize database tables with schema and default seed profile if empty."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # User Profile table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
        height REAL NOT NULL,
        current_weight REAL NOT NULL,
        target_weight REAL NOT NULL,
        fitness_goal TEXT NOT NULL,
        activity_level REAL NOT NULL,
        diet_preference TEXT NOT NULL,
        calorie_goal INTEGER NOT NULL,
        protein_goal INTEGER NOT NULL,
        carbs_goal INTEGER NOT NULL,
        fats_goal INTEGER NOT NULL,
        water_goal INTEGER NOT NULL,
        streak_days INTEGER NOT NULL
    )
    """)

    # Meals and Nutrition logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER DEFAULT 1,
        meal_type TEXT NOT NULL,
        food_name TEXT NOT NULL,
        calories INTEGER NOT NULL,
        protein REAL NOT NULL,
        carbs REAL NOT NULL,
        fats REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Water logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS water_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER DEFAULT 1,
        amount_ml INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Workouts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER DEFAULT 1,
        routine_name TEXT NOT NULL,
        burned_calories INTEGER NOT NULL,
        duration_seconds INTEGER NOT NULL,
        exercises_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Seed initial user if not present
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
        INSERT INTO users (
            name, age, gender, height, current_weight, target_weight,
            fitness_goal, activity_level, diet_preference,
            calorie_goal, protein_goal, carbs_goal, fats_goal,
            water_goal, streak_days
        ) VALUES (
            'New Athlete', 25, 'male', 175.0, 70.0, 75.0,
            'Muscle Gain', 1.55, 'High Protein Omnivore',
            2500, 155, 260, 65,
            3000, 1
        )
        """)

        # Seed initial meals
        initial_meals = [
            ('Breakfast', 'Oatmeal with Whey & Berries', 480, 36.0, 62.0, 8.0),
            ('Breakfast', 'Whole Eggs (2) Boiled', 156, 13.0, 1.0, 11.0),
            ('Lunch', 'Grilled Chicken Breast with Brown Rice', 540, 48.0, 55.0, 9.0),
            ('Lunch', 'Steamed Broccoli with Olive Oil', 110, 4.0, 10.0, 7.0),
            ('Dinner', 'Atlantic Salmon with Sweet Potato', 510, 38.0, 45.0, 18.0),
            ('Snacks', 'Greek Yogurt (0% Fat) with Honey', 160, 18.0, 20.0, 0.5)
        ]
        cursor.executemany("""
        INSERT INTO meals (meal_type, food_name, calories, protein, carbs, fats)
        VALUES (?, ?, ?, ?, ?, ?)
        """, initial_meals)

        # Seed water intake
        cursor.execute("INSERT INTO water_logs (amount_ml) VALUES (2500)")

    conn.commit()
    conn.close()
    print("[FITORA] SQLite database schema initialized successfully at:", DB_FILE)

class FitoraRequestHandler(SimpleHTTPRequestHandler):
    """Handles static web files and RESTful API endpoints for FITORA."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def _send_json(self, status_code, data):
        """Helper to return JSON response with CORS headers."""
        response = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(response)

    def do_OPTIONS(self):
        """Handle CORS pre-flight."""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        """Handle GET requests for static files and REST API."""
        parsed_path = urlparse(self.path)

        # REST API Endpoints
        if parsed_path.path == "/api/state":
            self.handle_get_state()
            return
        elif parsed_path.path == "/api/profile":
            self.handle_get_profile()
            return
        elif parsed_path.path == "/api/meals":
            self.handle_get_meals()
            return
        elif parsed_path.path == "/api/health":
            self._send_json(200, {"status": "ok", "app": "FITORA Fitness Engine"})
            return

        # Fallback to standard static file server
        super().do_GET()

    def do_POST(self):
        """Handle POST requests for REST API."""
        parsed_path = urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)

        try:
            body = json.loads(post_data.decode("utf-8")) if post_data else {}
        except Exception:
            body = {}

        if parsed_path.path == "/api/profile":
            self.handle_update_profile(body)
        elif parsed_path.path == "/api/meals":
            self.handle_add_meal(body)
        elif parsed_path.path == "/api/water":
            self.handle_add_water(body)
        elif parsed_path.path == "/api/water/reset":
            self.handle_reset_water()
        elif parsed_path.path == "/api/workouts":
            self.handle_save_workout(body)
        elif parsed_path.path == "/api/reset":
            self.handle_reset_all()
        else:
            self._send_json(404, {"error": "API route not found"})

    def do_DELETE(self):
        """Handle DELETE requests for meals."""
        parsed_path = urlparse(self.path)
        if parsed_path.path.startswith("/api/meals/"):
            try:
                meal_id = int(parsed_path.path.split("/")[-1])
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute("DELETE FROM meals WHERE id = ?", (meal_id,))
                conn.commit()
                conn.close()
                self._send_json(200, {"success": True, "deleted_id": meal_id})
            except Exception as e:
                self._send_json(500, {"error": str(e)})
        else:
            self._send_json(404, {"error": "Endpoint not found"})

    # API Handlers
    def handle_get_state(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Get user
            cursor.execute("SELECT * FROM users LIMIT 1")
            user_row = cursor.fetchone()
            if not user_row:
                conn.close()
                self._send_json(404, {"error": "No user found"})
                return

            profile = {
                "name": user_row["name"],
                "age": user_row["age"],
                "gender": user_row["gender"],
                "height": user_row["height"],
                "currentWeight": user_row["current_weight"],
                "targetWeight": user_row["target_weight"],
                "fitnessGoal": user_row["fitness_goal"],
                "activityLevel": user_row["activity_level"],
                "dietPreference": user_row["diet_preference"],
                "calorieGoal": user_row["calorie_goal"],
                "proteinGoal": user_row["protein_goal"],
                "carbsGoal": user_row["carbs_goal"],
                "fatsGoal": user_row["fats_goal"],
                "waterGoal": user_row["water_goal"],
                "streakDays": user_row["streak_days"]
            }

            # Get meals
            cursor.execute("SELECT * FROM meals ORDER BY id ASC")
            meal_rows = cursor.fetchall()
            meals = [{
                "id": m["id"],
                "meal": m["meal_type"],
                "name": m["food_name"],
                "calories": m["calories"],
                "protein": m["protein"],
                "carbs": m["carbs"],
                "fats": m["fats"]
            } for m in meal_rows]

            # Get water sum
            cursor.execute("SELECT SUM(amount_ml) FROM water_logs")
            drank_water = cursor.fetchone()[0] or 0

            conn.close()

            self._send_json(200, {
                "profile": profile,
                "nutrition": {"meals": meals},
                "water": {
                    "drankMl": drank_water,
                    "targetMl": profile["waterGoal"]
                }
            })
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def handle_get_profile(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users LIMIT 1")
            row = cursor.fetchone()
            conn.close()
            if row:
                self._send_json(200, dict(row))
            else:
                self._send_json(404, {"error": "No profile"})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def handle_get_meals(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM meals ORDER BY id ASC")
            rows = cursor.fetchall()
            conn.close()
            self._send_json(200, [dict(r) for r in rows])
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def handle_update_profile(self, data):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
            UPDATE users SET
                name = ?, age = ?, gender = ?, height = ?,
                current_weight = ?, target_weight = ?, fitness_goal = ?,
                activity_level = ?, diet_preference = ?,
                calorie_goal = ?, protein_goal = ?, carbs_goal = ?, fats_goal = ?,
                water_goal = ?
            WHERE id = 1
            """, (
                data.get("name", "Athlete"),
                data.get("age", 25),
                data.get("gender", "male"),
                data.get("height", 175),
                data.get("currentWeight", 70),
                data.get("targetWeight", 75),
                data.get("fitnessGoal", "Muscle Gain"),
                data.get("activityLevel", 1.55),
                data.get("dietPreference", "High Protein"),
                data.get("calorieGoal", 2500),
                data.get("proteinGoal", 160),
                data.get("carbsGoal", 260),
                data.get("fatsGoal", 65),
                data.get("waterGoal", 3000)
            ))
            conn.commit()
            conn.close()
            self._send_json(200, {"success": True, "message": "Profile updated in SQLite"})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def handle_add_meal(self, data):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO meals (meal_type, food_name, calories, protein, carbs, fats)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (
                data.get("meal", "Lunch"),
                data.get("name", "Custom Food"),
                int(data.get("calories", 0)),
                float(data.get("protein", 0)),
                float(data.get("carbs", 0)),
                float(data.get("fats", 0))
            ))
            new_id = cursor.lastrowid
            conn.commit()
            conn.close()
            self._send_json(200, {"success": True, "id": new_id})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def handle_add_water(self, data):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO water_logs (amount_ml) VALUES (?)", (int(data.get("amount", 250)),))
            conn.commit()
            cursor.execute("SELECT SUM(amount_ml) FROM water_logs")
            total = cursor.fetchone()[0] or 0
            conn.close()
            self._send_json(200, {"success": True, "total_water": total})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def handle_reset_water(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("DELETE FROM water_logs")
            conn.commit()
            conn.close()
            self._send_json(200, {"success": True, "message": "Water reset"})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def handle_save_workout(self, data):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO workouts (routine_name, burned_calories, duration_seconds, exercises_json)
            VALUES (?, ?, ?, ?)
            """, (
                data.get("routineName", "Daily Routine"),
                int(data.get("burnedCalories", 400)),
                int(data.get("durationSeconds", 2700)),
                json.dumps(data.get("exercises", []))
            ))
            conn.commit()
            conn.close()
            self._send_json(200, {"success": True})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def handle_reset_all(self):
        try:
            if os.path.exists(DB_FILE):
                os.remove(DB_FILE)
            init_database()
            self._send_json(200, {"success": True, "message": "Database refreshed to demo data"})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

def run_server():
    """Start the Fitora HTTP server and database."""
    init_database()
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, FitoraRequestHandler)

    print("=" * 70)
    print("  ███████╗██╗████████╗ ██████╗ ██████╗  █████╗ ")
    print("  ██╔════╝██║╚══██╔══╝██╔═══██╗██╔══██╗██╔══██╗")
    print("  █████╗  ██║   ██║   ██║   ██║██████╔╝███████║")
    print("  ██╔══╝  ██║   ██║   ██║   ██║██╔══██╗██╔══██║")
    print("  ██║     ██║   ██║   ╚██████╔╝██║  ██║██║  ██║")
    print("  ╚═╝     ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝")
    print("  ELITE FITNESS & NUTRITION MANAGEMENT PLATFORM")
    print("=" * 70)
    print(f"[*] FITORA Server running on: http://localhost:{PORT}")
    print(f"[*] SQLite Database initialized: {DB_FILE}")
    print("[*] Press Ctrl+C to stop the server.")
    print("=" * 70)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[FITORA] Server stopped gracefully.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()
