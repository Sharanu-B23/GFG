# run.py
import os
from giveforgood import app
from giveforgood import routes  # <-- ADD THIS LINE

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

