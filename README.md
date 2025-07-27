# LIC Agent Portfolio Website

A professional portfolio website for LIC (Life Insurance Corporation) agents built with HTML, CSS, JavaScript, and Flask.

## Features

### Frontend Features
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Hero Section**: Professional introduction with CLIA certification highlight
- **About Section**: Agent profile, experience, and client testimonials
- **Insurance Plans**: Comprehensive display of LIC plan categories
- **Advisor Application**: Complete form for new advisor applications
- **Contact Section**: Multiple contact methods and inquiry form
- **Blog Section**: Insurance insights and educational content
- **WhatsApp Integration**: Direct chat functionality
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

### Backend Features
- **Form Processing**: Handle advisor applications and contact inquiries
- **File Upload**: Resume upload for advisor applications
- **Email Notifications**: Automatic email alerts for new submissions
- **Admin Dashboard**: View and manage applications and inquiries
- **Data Storage**: JSON-based storage (easily upgradeable to database)

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd lic_agent_portfolio
   \`\`\`

2. **Install Python dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

3. **Configure email settings**
   Edit `app.py` and update the email configuration:
   ```python
   app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
   app.config['MAIL_PASSWORD'] = 'your-app-password'
   \`\`\`

4. **Run the application**
   \`\`\`bash
   python app.py
   \`\`\`

5. **Access the website**
   Open your browser and go to `http://localhost:5000`

## File Structure

\`\`\`
lic_agent_portfolio/
├── static/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── script.js          # JavaScript functionality
│   └── images/                # Image assets
├── templates/
│   ├── index.html             # Main website template
│   └── dashboard.html         # Admin dashboard template
├── uploads/                   # Uploaded resume files
├── app.py                     # Flask application
├── requirements.txt           # Python dependencies
└── README.md                  # This file
\`\`\`

## Customization

### Agent Information
Update the following in `index.html`:
- Agent name and details
- Contact information
- Office address
- Social media links

### Styling
Modify `static/css/style.css` to:
- Change color scheme
- Update fonts
- Adjust layout and spacing
- Add custom animations

### Functionality
Extend `static/js/script.js` to:
- Add new interactive features
- Integrate with third-party services
- Enhance form validation
- Add analytics tracking

## Deployment

### Local Development
The application runs on Flask's development server by default.

### Production Deployment
For production deployment:

1. **Use a production WSGI server** (e.g., Gunicorn)
2. **Set up a proper database** (PostgreSQL, MySQL)
3. **Configure environment variables** for sensitive data
4. **Set up SSL certificate** for HTTPS
5. **Use a reverse proxy** (Nginx, Apache)

### Environment Variables
Create a `.env` file for production:
\`\`\`
SECRET_KEY=your-secret-key
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
DATABASE_URL=your-database-url
\`\`\`

## Features in Detail

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly navigation
- Optimized images and fonts

### SEO Optimization
- Semantic HTML structure
- Meta tags for social sharing
- Local business schema markup
- Fast loading performance

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios

### Performance
- Optimized CSS and JavaScript
- Lazy loading for images
- Minified assets
- Efficient animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Support

For support and questions:
- Email: rckushwaha1978@gmail.com
- Phone: +91 9893711903
- WhatsApp: +91 9893711903

## Changelog

### Version 1.0.0
- Initial release
- Complete website functionality
- Admin dashboard
- Email integration
- Responsive design

---

**Note**: This is a demo website. Replace placeholder content with actual agent information before deployment.
