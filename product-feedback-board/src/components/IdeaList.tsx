import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { IdeaCard } from './IdeaCard';
import type { Idea } from '../types';

interface IdeaListProps {
  ideas: Idea[];
  onVote: (id: string, increment: boolean) => void;
  onEdit: (idea: Idea) => void;
  onDelete: (id: string) => void;
  onReorder: (ideas: Idea[]) => void;
}

export const IdeaList: React.FC<IdeaListProps> = ({
  ideas,
  onVote,
  onEdit,
  onDelete,
  onReorder
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = ideas.findIndex((idea) => idea.id === active.id);
      const newIndex = ideas.findIndex((idea) => idea.id === over.id);
      
      const newIdeas = arrayMove(ideas, oldIndex, newIndex);
      onReorder(newIdeas);
    }
  }

  if (ideas.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No ideas yet</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Create your first idea to get started with the feedback board.
        </p>
      </motion.div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ideas.map(idea => idea.id)} strategy={verticalListSortingStrategy}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onVote={onVote}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
};