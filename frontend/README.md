# Internship Tracker Frontend

A modern, responsive React + Vite frontend for managing internship opportunities. Built with a clean, intuitive UI that works seamlessly on desktop, tablet, and mobile devices.

## Features

✨ **Complete Internship Management:**
- 📋 **View Internships** - Display all internship records in an attractive card layout
- ➕ **Add New Internships** - Easy-to-use form with validation
- 🔍 **Search Functionality** - Search by student name, company, internship role, or mentor
- 🏢 **Filter by Company** - Filter internships by company name
- 📍 **Filter by Type** - Filter by internship type (Online, Offline, Hybrid)
- 🗑️ **Delete Internships** - Remove internship records with confirmation
- 📱 **Responsive Design** - Optimized for all screen sizes (mobile, tablet, desktop)

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS3 with responsive design
- **Node.js**: v18+ recommended

## Installation

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

## Running the Application

### Development Mode

Start the development server (runs on http://localhost:3000):

```bash
npm run dev
```

The app will automatically open in your browser with hot module replacement enabled.

### Production Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Backend Configuration

This frontend connects to the backend API running on `http://localhost:5000`.

### Before running the frontend, ensure your backend is running:

```bash
# In the backend directory
npm run dev  # or npm start
```

The backend should be accessible at:
- API Base: `http://localhost:5000`
- Internships Endpoint: `http://localhost:5000/api/internships`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── InternshipForm.jsx      # Form for adding new internships
│   │   └── InternshipList.jsx      # Component to display internships
│   ├── App.jsx                     # Main application component
│   ├── App.css                     # Comprehensive responsive styles
│   └── main.jsx                    # React entry point
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## API Integration

The frontend connects to the backend API with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/internships` | Get all internships |
| POST | `/api/internships` | Create new internship |
| GET | `/api/internships/:id` | Get specific internship |
| PUT | `/api/internships/:id` | Update internship |
| DELETE | `/api/internships/:id` | Delete internship |

## Data Structure

Each internship record contains:
- `studentName` - Name of the student
- `studentEmail` - Email of the student
- `companyName` - Name of the company
- `internshipRole` - Position/role in the internship
- `internshipType` - Type (Online, Offline, Hybrid)
- `startDate` - Start date of internship
- `endDate` - End date of internship
- `mentorName` - Name of the mentor/supervisor
- `isPaid` - Whether the internship is paid (boolean)

## Responsive Design Features

### Mobile (< 480px)
- Single-column card layout
- Touch-friendly buttons and controls
- Optimized font sizes and spacing
- Full-width forms and inputs

### Tablet (480px - 768px)
- Two-column card grid
- Adjusted form layouts
- Flexible filter controls

### Desktop (> 768px)
- Multi-column responsive grid
- Advanced filter options
- Side-by-side form inputs

## Styling Features

### Color Scheme
- Primary: Indigo (#4f46e5)
- Secondary: Cyan (#06b6d4)
- Danger: Red (#ef4444)
- Success: Green (#10b981)

### Dark Mode Support
The application includes automatic dark mode support for users with `prefers-color-scheme: dark`.

### Print Styles
Optimized print styles for printing internship records.

## Troubleshooting

### Backend Connection Error
**Error**: "Failed to fetch internships. Make sure your backend is running on http://localhost:5000"

**Solution**:
1. Verify the backend is running on port 5000
2. Check CORS settings in the backend (should allow requests from http://localhost:3000)
3. Ensure MongoDB is connected and running

### Form Validation Errors
The form validates:
- All required fields must be filled
- Email must be valid format
- End date must be after start date
- Student name, company name, and mentor name cannot be empty

### Port Already in Use
If port 3000 is already in use, you can change it in `vite.config.js`:

```javascript
server: {
  port: 3001, // Change to any available port
  open: true,
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Lazy loading for components
- Optimized bundle size with Vite
- CSS caching and minification
- Responsive image handling

## Future Enhancements

- [ ] Edit/Update internship records
- [ ] Export data to CSV/PDF
- [ ] Sort options (by date, company, etc.)
- [ ] Pagination for large datasets
- [ ] User authentication
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Calendar view

## Contributing

When contributing to the frontend:
1. Follow the existing code structure
2. Use React functional components with hooks
3. Keep components modular and reusable
4. Test on multiple screen sizes
5. Update CSS for responsive changes

## License

This project is part of the Online Internship Tracking System.

## Support

For issues or questions:
1. Check this README
2. Review the troubleshooting section
3. Check browser console for error messages
4. Ensure backend is running properly

---

**Happy Tracking!** 🚀

Made with ❤️ for efficient internship management.
