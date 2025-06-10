import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Idea, Category } from '../types';

interface EditIdeaModalProps {
  idea: Idea | null;
  onSave: (id: string, text: string, category: Category) => void;
  onClose: () => void;
}

const categories: { value: Category; label: string; color: string }[] = [
  { value: 'UI', label: 'UI/UX', color: 'blue' },
  { value: 'Performance', label: 'Performance', color: 'green' },
  { value: 'Feature', label: 'Feature', color: 'purple' },
  { value: 'Other', label: 'Other', color: 'orange' }
];

export const EditIdeaModal: React.FC<EditIdeaModalProps> = ({ idea, onSave, onClose }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('Feature');

  useEffect(() => {
    if (idea) {
      setText(idea.text);
      setCategory(idea.category);
    }
  }, [idea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea && text.trim()) {
      onSave(idea.id, text.trim(), category);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {idea && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Edit Idea
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="edit-idea-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Idea
                </label>
                <textarea
                  id="edit-idea-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe your idea in detail..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.value}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCategory(cat.value)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
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

              <div className="flex space-x-3 pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all"
                >
                  Save Changes
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};