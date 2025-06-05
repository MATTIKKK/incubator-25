import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const Search: React.FC<SearchProps> = ({ 
  onSearch, 
  placeholder = 'Search' 
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="bg-bg-secondary-light dark:bg-bg-secondary-dark block w-full pl-10 pr-10 py-2 border border-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-text-light-primary dark:text-text-dark-primary"
          placeholder={placeholder}
        />
        {query && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={clearSearch}
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};