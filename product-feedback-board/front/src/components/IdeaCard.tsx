import React from 'react';
import { ThumbsUp, ThumbsDown, Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  onVote: (id: string, increment: boolean) => void;
  onEdit: (idea: Idea) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  UI: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  Performance: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  Feature: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  Other: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
};

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onVote, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: idea.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 cursor-grab active:cursor-grabbing transition-all hover:shadow-md ${
        isDragging ? 'opacity-50 scale-105 shadow-xl' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[idea.category]}`}>
            <Tag className="w-3 h-3 inline mr-1" />
            {idea.category}
          </span>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(idea.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(idea);
            }}
            className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Edit idea"
          >
            <Edit className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(idea.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Delete idea"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <p className="text-gray-900 dark:text-gray-100 mb-4 leading-relaxed">
        {idea.text}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onVote(idea.id, true);
            }}
            className="flex items-center space-x-1 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            title="Upvote"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm font-medium">+1</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onVote(idea.id, false);
            }}
            className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            title="Downvote"
          >
            <ThumbsDown className="w-4 h-4" />
            <span className="text-sm font-medium">-1</span>
          </motion.button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {idea.votes} votes
          </div>
          <div className={`w-2 h-2 rounded-full ${
            idea.votes > 0 ? 'bg-green-500' : idea.votes < 0 ? 'bg-red-500' : 'bg-gray-400'
          }`} />
        </div>
      </div>
    </motion.div>
  );
};