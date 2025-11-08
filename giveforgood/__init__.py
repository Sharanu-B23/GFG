# giveforgood/__init__.py

from flask import Flask
from .config import Config
from flask_sqlalchemy import SQLAlchemy  # <-- ADD THIS

# Create the Flask application instance
app = Flask(__name__)
app.config.from_object(Config)

# --- ADD THIS SECTION ---
# Initialize the database
db = SQLAlchemy(app)
# ------------------------