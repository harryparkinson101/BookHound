require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

// Create a MySQL connection using environment variables
const db = mysql.createPool({
  host: process.env.DATABASE_HOST,  
  user: process.env.DATABASE_USER,       
  password: process.env.DATABASE_PASSWORD,  
  database: process.env.DATABASE_NAME,
});

async function importBooks() {
  try {
    // Read the JSON file
    const data = fs.readFileSync('../public/books.json', 'utf8');
    const books = JSON.parse(data);

    // Prepare SQL query
    const query = `INSERT INTO books (title, price, image_url, category) VALUES (?, ?, ?, ?)`;

    // Insert each book into the database
    for (const book of books) {
      await db.query(query, [book.title, book.price, book.image_url, book.category]);
    }

    console.log('Books successfully imported!');
  } catch (err) {
    console.error('Error importing books:', err);
  }
}

// Call the function to start the import process
importBooks();
