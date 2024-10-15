"use client";
import { useEffect, useState } from 'react';
import BookGrid from "@/components/BookGrid";
import { Book } from "@/types/types";
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import FilterAndSort from '@/components/FilterAndSort';
import { useResponsive } from '@/hooks/useResponsive'; // Import your custom hook

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isSmall, isMobile } = useResponsive(); // Get responsive values
  const booksPerPage = isMobile ? 10 : isSmall ? 15 : 20; // Adjust books per page based on device size
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);

  // Fetch books data from API
  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data: Book[] = await response.json();
      console.log("Fetched Books:", data);
      setBooks(data);
      setSearchedBooks(data);

      const uniqueCategories = Array.from(new Set(data.map(book => book.category)));
      setCategories(uniqueCategories);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Implement search functionality
  const handleSearch = (query: string) => {
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedBooks(filteredBooks);
  };

  const filteredBooks = searchedBooks.filter(book =>
    selectedCategory ? book.category === selectedCategory : true
  );

  // Sort the filtered books based on the selected sort option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    // Remove currency symbols and convert to float
    const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
    const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));

    if (isNaN(priceA) || isNaN(priceB)) {
      return 0; // Handle case where price is not a number
    }

    if (sortOption === "asc") {
      return priceA - priceB; // Sort from low to high
    } else if (sortOption === "desc") {
      return priceB - priceA; // Sort from high to low
    }
    return 0; // No sorting
  });


  // Calculate current books for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <main className="w-full bg-gray-800 px-8">
      <h1 className="text-4xl font-bold mb-4 text-white tracking-widest text-center pt-10">BOOKHOUND</h1>
      <SearchBar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
      <div className="flex justify-between mb-4">
        <FilterAndSort
          categories={categories}
          onSelectCategory={setSelectedCategory}
          onSort={setSortOption}
        />
      </div>
      <BookGrid books={currentBooks} />
      <Pagination
        totalBooks={sortedBooks.length}
        booksPerPage={booksPerPage} // Make sure this is passed correctly from the parent
        paginate={setCurrentPage}
      />
    </main>
  );
}
