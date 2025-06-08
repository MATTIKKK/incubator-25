import { useStore } from '../store/useStore';
import type { Category } from '../types';

// Mock zustand
jest.mock('zustand', () => ({
  create: (fn: any) => {
    const store = fn(() => {}, () => ({}));
    return () => store;
  },
}));

describe('useStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const store = useStore.getState();
    store.clearAllData();
  });

  test('should add new idea', () => {
    const store = useStore.getState();
    const initialCount = store.ideas.length;
    
    store.addIdea('Test idea', 'Feature');
    
    expect(store.ideas).toHaveLength(initialCount + 1);
    expect(store.ideas[store.ideas.length - 1].text).toBe('Test idea');
    expect(store.ideas[store.ideas.length - 1].category).toBe('Feature');
  });

  test('should update existing idea', () => {
    const store = useStore.getState();
    store.addIdea('Original idea', 'UI');
    
    const ideaId = store.ideas[0].id;
    store.updateIdea(ideaId, 'Updated idea', 'Performance');
    
    const updatedIdea = store.ideas.find(idea => idea.id === ideaId);
    expect(updatedIdea?.text).toBe('Updated idea');
    expect(updatedIdea?.category).toBe('Performance');
  });

  test('should delete idea', () => {
    const store = useStore.getState();
    store.addIdea('Test idea', 'Feature');
    
    const ideaId = store.ideas[0].id;
    const initialCount = store.ideas.length;
    
    store.deleteIdea(ideaId);
    
    expect(store.ideas).toHaveLength(initialCount - 1);
    expect(store.ideas.find(idea => idea.id === ideaId)).toBeUndefined();
  });

  test('should vote on idea', () => {
    const store = useStore.getState();
    store.addIdea('Test idea', 'Feature');
    
    const ideaId = store.ideas[0].id;
    
    // Upvote
    store.voteIdea(ideaId, true);
    expect(store.ideas[0].votes).toBe(1);
    
    // Downvote
    store.voteIdea(ideaId, false);
    expect(store.ideas[0].votes).toBe(0);
  });

  test('should not allow negative votes', () => {
    const store = useStore.getState();
    store.addIdea('Test idea', 'Feature');
    
    const ideaId = store.ideas[0].id;
    
    // Try to downvote when votes is 0
    store.voteIdea(ideaId, false);
    expect(store.ideas[0].votes).toBe(0);
  });

  test('should filter ideas correctly', () => {
    const store = useStore.getState();
    store.addIdea('UI idea', 'UI');
    store.addIdea('Performance idea', 'Performance');
    store.addIdea('Feature idea', 'Feature');
    
    store.setFilter('UI');
    expect(store.filterAndSort.filter).toBe('UI');
  });

  test('should calculate statistics correctly', () => {
    const store = useStore.getState();
    store.addIdea('Test idea 1', 'UI');
    store.addIdea('Test idea 2', 'Performance');
    store.voteIdea(store.ideas[0].id, true);
    store.voteIdea(store.ideas[1].id, true);
    store.voteIdea(store.ideas[1].id, true);
    
    const stats = store.getStatistics();
    
    expect(stats.totalIdeas).toBe(2);
    expect(stats.totalVotes).toBe(3);
    expect(stats.ideasLast7Days).toBe(2); // Both ideas created recently
  });
});