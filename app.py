from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
from flask_mail import Mail, Message
import os
from datetime import datetime
import json
import logging

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'rckushwaha1978@gmail.com'
app.config['MAIL_PASSWORD'] = 'ocxecuuluqrbikjo'  # Your app password
#app.config['MAIL_DEFAULT_SENDER'] = 'rckushwaha1978@gmail.com'

mail = Mail(app)

# Ensure upload directory exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def test_email_connection():
    """Test email connection on startup"""
    try:
        with mail.connect() as conn:
            logger.info("Email connection successful!")
            return True
    except Exception as e:
        logger.error(f"Email connection failed: {e}")
        return False

@app.route('/')
def index():
    # Test email connection when app starts
    test_email_connection()
    return render_template('index.html')

@app.route('/submit_advisor_application', methods=['POST'])
def submit_advisor_application():
    try:
        logger.info("Processing advisor application...")
        
        # Get form data
        first_name = request.form.get('firstName')
        last_name = request.form.get('lastName')
        email = request.form.get('email')
        phone = request.form.get('phone')
        age = request.form.get('age')
        education = request.form.get('education')
        experience = request.form.get('experience')
        
        logger.info(f"Application from: {first_name} {last_name} ({email})")
        
        # Handle file upload
        resume_file = request.files.get('resume')
        resume_filename = None
        if resume_file and resume_file.filename:
            resume_filename = f"{first_name}_{last_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{resume_file.filename}"
            resume_file.save(os.path.join(app.config['UPLOAD_FOLDER'], resume_filename))
            logger.info(f"Resume saved: {resume_filename}")
        
        # Save application data
        application_data = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'phone': phone,
            'age': age,
            'education': education,
            'experience': experience,
            'resume_filename': resume_filename,
            'submitted_at': datetime.now().isoformat()
        }
        
        # Save to JSON file
        applications_file = 'advisor_applications.json'
        applications = []
        if os.path.exists(applications_file):
            with open(applications_file, 'r') as f:
                applications = json.load(f)
        
        applications.append(application_data)
        
        with open(applications_file, 'w') as f:
            json.dump(applications, f, indent=2)
        
        logger.info("Application data saved to file")
        
        # Send email notification
        try:
            logger.info("Attempting to send email...")
            
            msg = Message(
                subject='New LIC Advisor Application',
                sender=app.config['MAIL_USERNAME'],
                recipients=['rckushwaha1978@gmail.com']  # Fixed: removed extra .com
            )
            
            msg.body = f"""
New advisor application received:

Name: {first_name} {last_name}
Email: {email}
Phone: {phone}
Age: {age}
Education: {education}
Experience: {experience}
Resume: {resume_filename if resume_filename else 'Not provided'}

Submitted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
            
            mail.send(msg)
            logger.info("Email sent successfully!")
            
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            # Still return success to user, but log the error
            
        return jsonify({
            'success': True,
            'message': 'Your advisor application has been submitted successfully! We will contact you within 2-3 business days.'
        })
        
    except Exception as e:
        logger.error(f"Application submission error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'There was an error submitting your application. Please try again.'
        }), 500

@app.route('/submit_contact_form', methods=['POST'])
def submit_contact_form():
    try:
        logger.info("Processing contact form...")
        
        # Get form data
        name = request.form.get('name')
        phone = request.form.get('phone')
        email = request.form.get('email')
        purpose = request.form.get('purpose')
        message = request.form.get('message')
        
        logger.info(f"Contact form from: {name} ({email})")
        
        # Save contact data
        contact_data = {
            'name': name,
            'phone': phone,
            'email': email,
            'purpose': purpose,
            'message': message,
            'submitted_at': datetime.now().isoformat()
        }
        
        # Save to JSON file
        contacts_file = 'contact_inquiries.json'
        contacts = []
        if os.path.exists(contacts_file):
            with open(contacts_file, 'r') as f:
                contacts = json.load(f)
        
        contacts.append(contact_data)
        
        with open(contacts_file, 'w') as f:
            json.dump(contacts, f, indent=2)
        
        logger.info("Contact data saved to file")
        
        # Send email notification
        try:
            logger.info("Attempting to send contact email...")
            
            msg = Message(
                subject=f'New Contact Inquiry - {purpose}',
                sender=app.config['MAIL_USERNAME'],
                recipients=['rckushwaha1978@gmail.com']  # Fixed: removed extra .com
            )
            
            msg.body = f"""
New contact inquiry received:

Name: {name}
Phone: {phone}
Email: {email}
Purpose: {purpose}
Message: {message}

Submitted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
            
            mail.send(msg)
            logger.info("Contact email sent successfully!")
            
        except Exception as e:
            logger.error(f"Contact email sending failed: {str(e)}")
            # Still return success to user, but log the error
            
        return jsonify({
            'success': True,
            'message': 'Your message has been sent successfully! We will get back to you within 24 hours.'
        })
        
    except Exception as e:
        logger.error(f"Contact form submission error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'There was an error sending your message. Please try again.'
        }), 500

@app.route('/test_email')
def test_email():
    """Test route to check if email is working"""
    try:
        msg = Message(
            subject='Test Email from LIC Website',
            sender=app.config['MAIL_USERNAME'],
            recipients=['rckushwaha1978@gmail.com']
        )
        msg.body = f"This is a test email sent at {datetime.now()}"
        
        mail.send(msg)
        return jsonify({
            'success': True,
            'message': 'Test email sent successfully!'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Test email failed: {str(e)}'
        }), 500

@app.route('/dashboard')
def dashboard():
    try:
        # Load applications
        applications = []
        if os.path.exists('advisor_applications.json'):
            with open('advisor_applications.json', 'r') as f:
                applications = json.load(f)
        
        # Load contacts
        contacts = []
        if os.path.exists('contact_inquiries.json'):
            with open('contact_inquiries.json', 'r') as f:
                contacts = json.load(f)
        
        return render_template('dashboard.html',
                             applications=applications,
                             contacts=contacts)
    except Exception as e:
        return f"Error loading dashboard: {e}", 500

if __name__ == '__main__':
    app.run(debug=True)
