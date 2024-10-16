import React from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface FilterAndSortProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  onSort: (sortOption: string) => void;
}

// Function to truncate category names
const truncateString = (str: string, maxLength: number): string => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

const FilterAndSort: React.FC<FilterAndSortProps> = ({ categories, onSelectCategory, onSort }) => {
  const { isSmall, isMobile } = useResponsive();
  const maxCategoryLength = 40; // Define your max length for categories

  return (
    <div className={`flex ${isSmall || isMobile ? 'flex-col' : 'flex-row'} justify-between items-center w-full mb-4`}>
      {/* Category Filter */}
      <select
        onChange={(e) => onSelectCategory(e.target.value)}
        className={`p-2 bg-gray-700 text-white rounded ${isSmall ? 'w-full mb-2' : ''}`}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {truncateString(category, maxCategoryLength)} {/* Truncate if needed */}
          </option>
        ))}
      </select>

      {/* Sort Options */}
      <div className={`flex items-center pt-4 ${isSmall ? 'w-full justify-between' : 'ml-4'}`}>
        <label className="mr-2 text-white">Sort by Price:</label>
        <select onChange={(e) => onSort(e.target.value)} className="p-2 bg-gray-700 text-white rounded">
          <option value="">Default</option>
          <option value="asc">Price Low to High</option>
          <option value="desc">Price High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSort;

