import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { AppState, Idea, Category, FilterOption, SortOption, Statistics } from '../types';

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const isWithinLast7Days = (date: Date): boolean => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return new Date(date) > sevenDaysAgo;
};

const getMostPopularCategory = (ideas: Idea[]): Category => {
  const categoryCount = ideas.reduce((acc, idea) => {
    acc[idea.category] = (acc[idea.category] || 0) + 1;
    return acc;
  }, {} as Record<Category, number>);

  const entries = Object.entries(categoryCount) as [Category, number][];
  const [topCategory] = entries.reduce((max, current) => 
    current[1] > max[1] ? current : max, ['UI', 0] as [Category, number]
  );

  return topCategory || 'UI';
};

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        ideas: [],
        filterAndSort: {
          filter: 'all',
          sort: 'newest'
        },

        addIdea: (text: string, category: Category) => {
          const newIdea: Idea = {
            id: generateId(),
            text: text.trim(),
            category,
            votes: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          };

          set((state) => ({
            ideas: [...state.ideas, newIdea]
          }), false, 'addIdea');
        },

        updateIdea: (id: string, text: string, category: Category) => {
          set((state) => ({
            ideas: state.ideas.map(idea =>
              idea.id === id
                ? { ...idea, text: text.trim(), category, updatedAt: new Date() }
                : idea
            )
          }), false, 'updateIdea');
        },

        deleteIdea: (id: string) => {
          set((state) => ({
            ideas: state.ideas.filter(idea => idea.id !== id)
          }), false, 'deleteIdea');
        },

        voteIdea: (id: string, increment: boolean) => {
          set((state) => ({
            ideas: state.ideas.map(idea =>
              idea.id === id
                ? { ...idea, votes: Math.max(0, idea.votes + (increment ? 1 : -1)) }
                : idea
            )
          }), false, 'voteIdea');
        },

        setFilter: (filter: FilterOption) => {
          set((state) => ({
            filterAndSort: { ...state.filterAndSort, filter }
          }), false, 'setFilter');
        },

        setSort: (sort: SortOption) => {
          set((state) => ({
            filterAndSort: { ...state.filterAndSort, sort }
          }), false, 'setSort');
        },

        reorderIdeas: (ideas: Idea[]) => {
          set({ ideas }, false, 'reorderIdeas');
        },

        exportData: () => {
          const state = get();
          return JSON.stringify({
            ideas: state.ideas,
            filterAndSort: state.filterAndSort,
            exportDate: new Date().toISOString()
          }, null, 2);
        },

        importData: (jsonData: string) => {
          try {
            const data = JSON.parse(jsonData);
            if (data.ideas && Array.isArray(data.ideas)) {
              const validatedIdeas = data.ideas.map((idea: any) => ({
                ...idea,
                createdAt: new Date(idea.createdAt),
                updatedAt: new Date(idea.updatedAt || idea.createdAt)
              }));

              set({
                ideas: validatedIdeas,
                filterAndSort: data.filterAndSort || { filter: 'all', sort: 'newest' }
              }, false, 'importData');
              return true;
            }
            return false;
          } catch {
            return false;
          }
        },

        getStatistics: (): Statistics => {
          const { ideas } = get();
          const totalVotes = ideas.reduce((sum, idea) => sum + idea.votes, 0);
          const ideasLast7Days = ideas.filter(idea => isWithinLast7Days(idea.createdAt)).length;
          const votesLast7Days = ideas
            .filter(idea => isWithinLast7Days(idea.createdAt))
            .reduce((sum, idea) => sum + idea.votes, 0);

          return {
            totalIdeas: ideas.length,
            totalVotes,
            ideasLast7Days,
            votesLast7Days,
            topCategory: getMostPopularCategory(ideas)
          };
        },

        clearAllData: () => {
          set({
            ideas: [],
            filterAndSort: { filter: 'all', sort: 'newest' }
          }, false, 'clearAllData');
        }
      }),
      {
        name: 'feedback-board-storage',
        version: 1
      }
    ),
    { name: 'feedback-board' }
  )
);