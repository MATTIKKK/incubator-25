import React from 'react';
import { Moon, Sun, BarChart3, Download, Upload } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

interface HeaderProps {
  onShowStats: () => void;
  onExport: () => void;
  onImport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowStats, onExport, onImport }) => {
  const { theme, toggleTheme, } = useTheme();
  const statistics = useStore(state => state.getStatistics());
  const { user, logout } = useAuthStore();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Product Feedback Board
              </h1>
            </motion.div>

            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{statistics.totalIdeas} ideas</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{statistics.totalVotes} votes</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShowStats}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Show Statistics"
            >
              <BarChart3 className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExport}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Export Data"
            >
              <Download className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onImport}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Import Data"
            >
              <Upload className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>

            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-700 dark:text-gray-300">{user?.username}</span>

              <button
                onClick={logout}
                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
