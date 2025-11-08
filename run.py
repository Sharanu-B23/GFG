# run.py

from giveforgood import app
from giveforgood import routes  # <-- ADD THIS LINE

if __name__ == '__main__':
    app.run(debug=True)