# giveforgood/forms.py

from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, FloatField
from wtforms.validators import DataRequired, Email, NumberRange, Optional  # <-- Import Optional

# --- DELETE THE ENTIRE ContactForm CLASS BELOW ---
# class ContactForm(FlaskForm):
#     name = StringField('Name', validators=[DataRequired()])
#     ...
#     ...

class DonationForm(FlaskForm):
    name = StringField('Your Name', validators=[DataRequired()])
    email = StringField('Your Email', validators=[DataRequired(), Email()])
    amount = FloatField('Amount ($)', validators=[DataRequired(), NumberRange(min=1, message="Donation must be at least $1.")])
    message = TextAreaField('Short Message (Optional)', validators=[Optional()]) # <-- ADD THIS LINE
    submit = SubmitField('Donate Now')