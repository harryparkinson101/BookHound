// app/components/BookGrid.tsx

import React from 'react';
import BookCard from './BookCard';
import { Book } from '@/types/types'; // Adjust the import path as necessary

interface BookGridProps {
  books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book, index) => (
        <BookCard
          key={index}
          title={book.title}
          price={book.price}
          image_url={book.image_url}
          category={book.category}
        />
      ))}
    </div>
  );
};

export default BookGrid;
