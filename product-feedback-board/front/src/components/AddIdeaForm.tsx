import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category } from '../types';

interface AddIdeaFormProps {
  onAdd: (text: string, category: Category) => void;
}

const categories: { value: Category; label: string; color: string }[] = [
  { value: 'UI', label: 'UI/UX', color: 'blue' },
  { value: 'Performance', label: 'Performance', color: 'green' },
  { value: 'Feature', label: 'Feature', color: 'purple' },
  { value: 'Other', label: 'Other', color: 'orange' }
];

export const AddIdeaForm: React.FC<AddIdeaFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('Feature');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), category);
      setText('');
      setCategory('Feature');
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setText('');
    setCategory('Feature');
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="add-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group"
          >
            <div className="flex items-center justify-center space-x-2">
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Add New Idea</span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="idea-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Idea
                </label>
                <textarea
                  id="idea-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe your idea in detail..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.value}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCategory(cat.value)}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${
                        category === cat.value
                          ? `bg-${cat.color}-100 text-${cat.color}-800 ring-2 ring-${cat.color}-300 dark:bg-${cat.color}-900/30 dark:text-${cat.color}-300 dark:ring-${cat.color}-600`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                      }`}
                    >
                      {cat.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all"
                >
                  Add Idea
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};