# BookHound

**BookHound** is an open-source application designed to help users quickly determine whether a book is rare or valuable by scraping and displaying book data, including prices. The app leverages a database of books with pricing information and offers a user-friendly interface for searching, filtering, and sorting.

This project is designed to be scalable, allowing users to fork the repository, scrape additional books with prices, and contribute to growing the database.

## Features

- **Search:** Quickly search for books by title.
- **Filter & Sort:** Filter books by categories and sort them based on price.
- **Pagination:** Browse through the book collection easily with paginated results.
- **Responsive Design:** Optimized for both desktop and mobile users.
- **Smooth Scroll:** Automatically scrolls to the top of the page when navigating through pagination.
- **Open Source:** Fork and expand the book database with more valuable book data and pricing information.

## Demo

A live demo of BookHound is available [here](#).

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, API integration, MySQL for the book database
- **Web Scraping:** Python
- **Deployment:** Netlify

## How to Contribute

We welcome contributions to expand the book database and improve the functionality of BookHound. Here's how you can contribute:

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```
   git clone https://github.com/your-username/BookHound.git
Installation Steps

Follow these steps to set up and run BookHound locally:

Navigate to the project directory:
```
cd BookHound
```

Install dependencies: Make sure you have npm or yarn installed on your machine, then run:

```
npm install
```
Set up the database:

Create a MySQL database and configure your .env.local file with the correct database credentials. Here’s an example:
```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=bookhound
```
Run database migrations:
To structure your database, run the migration command:
```
npm run migrate
```
Start the development server: Once the dependencies are installed and the database is set up, start the app with:
```
npm run dev
```
Your application will be available at http://localhost:3000.

View books in the app: The app comes preloaded with books in the database. You can start searching, filtering, and exploring the collection immediately.

(Optional) Scrape more books: If you want to add more books, you can use the Python scraper included in the repository. Make sure you have Python installed, then run:
```
python3 scraper.py
```
in the /book-scraper directory.
