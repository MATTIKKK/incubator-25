import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FilterOption, SortOption } from '../types';

interface FilterControlsProps {
  filter: FilterOption;
  sort: SortOption;
  onFilterChange: (filter: FilterOption) => void;
  onSortChange: (sort: SortOption) => void;
}

const filterOptions: { value: FilterOption; label: string; color: string }[] = [
  { value: 'all', label: 'All Ideas', color: 'gray' },
  { value: 'UI', label: 'UI/UX', color: 'blue' },
  { value: 'Performance', label: 'Performance', color: 'green' },
  { value: 'Feature', label: 'Feature', color: 'purple' },
  { value: 'Other', label: 'Other', color: 'orange' }
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'date', label: 'Recently Updated' }
];

export const FilterControls: React.FC<FilterControlsProps> = ({
  filter,
  sort,
  onFilterChange,
  onSortChange
}) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFilterChange(option.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === option.value
                    ? `bg-${option.color}-100 text-${option.color}-800 ring-2 ring-${option.color}-300 dark:bg-${option.color}-900/30 dark:text-${option.color}-300 dark:ring-${option.color}-600`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="sm:w-48">
          <div className="flex items-center space-x-2 mb-3">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by</span>
          </div>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};