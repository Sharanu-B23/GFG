# giveforgood/models.py

from giveforgood import db
from datetime import datetime

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    donor_name = db.Column(db.String(100), nullable=False)
    donor_email = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    message = db.Column(db.Text, nullable=True)  # <-- ADD THIS LINE
    payment_id = db.Column(db.String(100), unique=True, nullable=True)
    donation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Donation('{self.donor_name}', '{self.amount}')"

# --- DELETE THE ENTIRE ContactMessage CLASS BELOW ---
# class ContactMessage(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     ...
#     ...