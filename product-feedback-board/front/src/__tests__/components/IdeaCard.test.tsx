import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IdeaCard } from '../../components/IdeaCard';
import type { Idea } from '../../types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock dnd-kit
jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}));

jest.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: () => '',
    },
  },
}));

const mockIdea: Idea = {
  id: '1',
  text: 'Test idea',
  category: 'Feature',
  votes: 5,
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
};

const mockProps = {
  idea: mockIdea,
  onVote: jest.fn(),
  onEdit: jest.fn(),
  onDelete: jest.fn(),
};

describe('IdeaCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders idea content correctly', () => {
    render(<IdeaCard {...mockProps} />);
    
    expect(screen.getByText('Test idea')).toBeInTheDocument();
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('5 votes')).toBeInTheDocument();
  });

  test('calls onVote when upvote button is clicked', () => {
    render(<IdeaCard {...mockProps} />);
    
    const upvoteButton = screen.getByTitle('Upvote');
    fireEvent.click(upvoteButton);
    
    expect(mockProps.onVote).toHaveBeenCalledWith('1', true);
  });

  test('calls onVote when downvote button is clicked', () => {
    render(<IdeaCard {...mockProps} />);
    
    const downvoteButton = screen.getByTitle('Downvote');
    fireEvent.click(downvoteButton);
    
    expect(mockProps.onVote).toHaveBeenCalledWith('1', false);
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<IdeaCard {...mockProps} />);
    
    const editButton = screen.getByTitle('Edit idea');
    fireEvent.click(editButton);
    
    expect(mockProps.onEdit).toHaveBeenCalledWith(mockIdea);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<IdeaCard {...mockProps} />);
    
    const deleteButton = screen.getByTitle('Delete idea');
    fireEvent.click(deleteButton);
    
    expect(mockProps.onDelete).toHaveBeenCalledWith('1');
  });

  test('displays correct category styling', () => {
    render(<IdeaCard {...mockProps} />);
    
    const categoryBadge = screen.getByText('Feature');
    expect(categoryBadge).toHaveClass('bg-purple-100', 'text-purple-800');
  });
});