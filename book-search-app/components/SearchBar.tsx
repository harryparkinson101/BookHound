import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; // Prop type for onSearch
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Call the onSearch prop with the new query
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a book..."
        className="p-2 bg-gray-700 text-white rounded"
      />
    </div>
  );
};

export default SearchBar;

