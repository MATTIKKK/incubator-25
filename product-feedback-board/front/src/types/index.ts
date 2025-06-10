export type Category = 'UI' | 'Performance' | 'Feature' | 'Other';

export interface Idea {
  id: string;
  text: string;
  category: Category;
  votes: number;
  createdAt: Date;
  updatedAt: Date;
}

export type SortOption = 'date' | 'popularity' | 'newest' | 'oldest';
export type FilterOption = 'all' | Category;

export interface FilterAndSort {
  filter: FilterOption;
  sort: SortOption;
}

export interface Statistics {
  totalIdeas: number;
  totalVotes: number;
  ideasLast7Days: number;
  votesLast7Days: number;
  topCategory: Category;
}

export interface AppState {
  ideas: Idea[];
  filterAndSort: FilterAndSort;
  addIdea: (text: string, category: Category) => void;
  updateIdea: (id: string, text: string, category: Category) => void;
  deleteIdea: (id: string) => void;
  voteIdea: (id: string, increment: boolean) => void;
  setFilter: (filter: FilterOption) => void;
  setSort: (sort: SortOption) => void;
  reorderIdeas: (ideas: Idea[]) => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  getStatistics: () => Statistics;
  clearAllData: () => void;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}