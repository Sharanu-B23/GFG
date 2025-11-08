# giveforgood/routes.py

from flask import render_template, redirect, url_for, flash
from giveforgood import app, db
from giveforgood.models import Donation
from giveforgood.forms import DonationForm
import os # Keep this from the gallery step

@app.route('/')
@app.route('/index')
def home():
    """Renders the home page."""
    return render_template('index.html')

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template('about.html', title='About Us')

# --- ADD THIS NEW GALLERY ROUTE ---
@app.route('/gallery')
def gallery():
    """Renders the gallery page."""
    
    # 1. Define the path to your image folder on your computer
    image_folder_path = os.path.join(app.static_folder, 'img')
    
    # 2. Get a list of all filenames in that folder
    allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif'}
    try:
        image_names = [f for f in os.listdir(image_folder_path) 
                       if os.path.splitext(f)[1].lower() in allowed_extensions]
    except FileNotFoundError:
        # If the /static/img folder doesn't exist, just return an empty list
        image_names = []
        flash('Gallery folder not found. Please create /giveforgood/static/img', 'danger')

    # 3. Create the correct WEB URL for each image
    #    This is the part we are fixing: 'img/' + name
    image_list = [url_for('static', filename='img/' + name) 
                  for name in image_names]

    return render_template('gallery.html', title='Gallery', images=image_list)
# ------------------------------------

@app.route('/donate', methods=['GET', 'POST'])
def donate():
    """Renders the donation page and handles form submission."""
    form = DonationForm()
    if form.validate_on_submit():
        # The form data (including form.message.data) is valid!
        # We will add the logic to save this to the database in Step 4.
        flash(f'Thank you, {form.name.data}, for your generous donation of ${form.amount.data}!', 'success')
        return redirect(url_for('home'))
        
    return render_template('donate.html', title='Donate', form=form)

# --- DELETE THE ENTIRE /contact ROUTE BELOW ---
# @app.route('/contact', methods=['GET', 'POST'])
# def contact():
#     ...
#     ...