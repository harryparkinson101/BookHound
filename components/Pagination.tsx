"use client";
import React, { useState, useEffect } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface PaginationProps {
  totalBooks: number;
  paginate: (pageNumber: number) => void;
  booksPerPage: number; // Keep booksPerPage as a prop
}

const Pagination: React.FC<PaginationProps> = ({ totalBooks, paginate, booksPerPage }) => {
  const { isSmall, isMobile } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  // Effect to adjust currentPage if it exceeds the number of pages
  useEffect(() => {
    const pageNumbers = Math.ceil(totalBooks / booksPerPage);
    if (currentPage > pageNumbers) {
      setCurrentPage(pageNumbers); // Reset to the last page if current exceeds total pages
      paginate(pageNumbers); // Update the pagination
    }
  }, [totalBooks, booksPerPage, currentPage, paginate]);

  const pageNumbers = Math.ceil(totalBooks / booksPerPage);

  const showPages = () => {
    const pagesToShow: (number | string)[] = [];

    if (pageNumbers <= 5) {
      for (let i = 1; i <= pageNumbers; i++) {
        pagesToShow.push(i);
      }
    } else {
      // Always show the first page
      pagesToShow.push(1);

      // Show ellipsis if the second page isn't directly after the first
      if (currentPage > 3) {
        pagesToShow.push('...');
      }

      // Show pages around the current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(pageNumbers - 1, currentPage + 1); i++) {
        pagesToShow.push(i);
      }

      // Show ellipsis if the last page isn't directly before the last
      if (currentPage < pageNumbers - 2) {
        pagesToShow.push('...');
      }

      // Always show the last page
      if (pageNumbers > 1) {
        pagesToShow.push(pageNumbers);
      }
    }

    return pagesToShow;
  };

  const handlePageClick = (number: number | string) => {
    if (typeof number === 'number') {
      setCurrentPage(number); // Update current page state
      paginate(number); // Call paginate function

      // Smooth scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scroll behavior
      });
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= pageNumbers) {
      setCurrentPage(value);
    }
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    paginate(currentPage); // Navigate to the current page
  };

  return (
    <nav className="flex items-center justify-between overflow-auto py-8">
      <ul className="flex space-x-2">
        {showPages().map((number, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageClick(number)}
              className={`px-4 py-2 bg-gray-600 text-white rounded ${typeof number === 'number' ? '' : 'opacity-50 cursor-default'}`}
              disabled={typeof number === 'string'}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleInputSubmit} className="flex items-center ml-4">
        <input
          type="number"
          min={1}
          max={pageNumbers}
          value={currentPage}
          onChange={handleInputChange}
          className="p-2 bg-gray-700 text-white rounded w-20 text-center"
          placeholder="Page"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-gray-600 text-white rounded">
          Go
        </button>
      </form>
    </nav>
  );
};

export default Pagination;
