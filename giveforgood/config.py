# giveforgood/config.py

import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a-very-hard-to-guess-string'
    DEBUG = True
    
    # --- CHANGE THIS LINE ---
    # We are replacing 'mysql+mysqlclient' with 'mysql+pymysql'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:sharan@127.0.0.1:3306/giveforgood_db'
    # ------------------------

    SQLALCHEMY_TRACK_MODIFICATIONS = False