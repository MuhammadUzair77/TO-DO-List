# Task Manager Web Application

A modern, responsive to-do list application with PHP backend for task persistence.

## Features

- **Add tasks** with a simple input field
- **Delete tasks** individually
- **Clear all tasks** with confirmation
- **Save tasks** to a text file on the server
- **Load tasks** automatically on page refresh
- **Responsive design** that works on mobile and desktop
- **Clean UI** with animations and visual feedback

## Technologies Used

- Frontend: HTML5, CSS3, JavaScript (ES6)
- Backend: PHP for task persistence
- Libraries: Font Awesome for icons, Google Fonts (Poppins)

## File Structure

- `index.html` - Main application interface
- `script.js` - All client-side functionality
- `load_tasks.php` - PHP endpoint to load saved tasks
- `save_tasks.php` - PHP endpoint to save tasks to file

## How It Works

1. Tasks are stored in `tasks.txt` on the server
2. The PHP backend handles reading/writing tasks
3. The frontend provides a smooth user experience with animations
4. All data persists between sessions

Simply upload to a PHP-enabled web server to use. No database required - tasks are stored in a text file.
