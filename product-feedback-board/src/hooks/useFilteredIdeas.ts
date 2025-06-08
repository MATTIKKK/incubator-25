import { useMemo } from 'react';
import type { Idea, FilterOption, SortOption } from '../types';

export const useFilteredIdeas = (
  ideas: Idea[],
  filter: FilterOption,
  sort: SortOption
): Idea[] => {
  return useMemo(() => {
    // Filter ideas
    let filteredIdeas = ideas;
    if (filter !== 'all') {
      filteredIdeas = ideas.filter(idea => idea.category === filter);
    }

    // Sort ideas
    const sortedIdeas = [...filteredIdeas].sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'popularity':
          return b.votes - a.votes;
        case 'date':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });

    return sortedIdeas;
  }, [ideas, filter, sort]);
};