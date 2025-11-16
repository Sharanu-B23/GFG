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
    # --- ADD is_home=True ---
    return render_template('index.html', is_home=True)

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template('about.html', title='About Us')

# --- ADD THIS NEW GALLERY ROUTE ---
# giveforgood/routes.py
import os # Make sure 'os' is imported at the top
from flask import render_template, url_for, flash # Make sure 'url_for' and 'flash' are imported
# ... (other imports)

# ... (other routes)

# --- REPLACE YOUR OLD GALLERY FUNCTION WITH THIS ---
@app.route('/gallery')
def gallery():
    """Renders the gallery page with photos and bills."""
    allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif'}
    
    # 1. Get Event Photos
    image_list = []
    try:
        image_folder_path = os.path.join(app.static_folder, 'img/img')
        image_names = [f for f in os.listdir(image_folder_path) 
                       if os.path.splitext(f)[1].lower() in allowed_extensions]
        image_list = [url_for('static', filename='img/img/' + name) for name in image_names]
    except FileNotFoundError:
        flash('Event photo folder not found.', 'danger')

    # 2. Get Bill Images (NEW SECTION)
    bill_list = []
    try:
        bill_folder_path = os.path.join(app.static_folder, 'img/bills')
        bill_names = [f for f in os.listdir(bill_folder_path) 
                      if os.path.splitext(f)[1].lower() in allowed_extensions]
        bill_list = [url_for('static', filename='img/bills/' + name) for name in bill_names]
    except FileNotFoundError:
        flash('Bills folder not found. Please create /static/img/bills', 'danger')

    # 3. Render the template with BOTH lists
    return render_template('gallery.html', 
                           title='Gallery', 
                           images=image_list, 
                           bills=bill_list)

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

# ... (all your other imports and routes) ...

@app.route('/dashboard')
def dashboard():
    # 1. Query the database to get all donations.
    #    We use order_by() to show the most recent donations first.
    all_donations = Donation.query.order_by(Donation.donation_date.desc()).all()
    
    # 2. Render a new template and pass the list of donations to it.
    return render_template('dashboard.html', 
                           title='Dashboard', 
                           donations=all_donations)