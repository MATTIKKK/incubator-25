import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { FilterControls } from './components/FilterControls';
import { AddIdeaForm } from './components/AddIdeaForm';
import { IdeaList } from './components/IdeaList';
import { EditIdeaModal } from './components/EditIdeaModal';
import { StatisticsModal } from './components/StatisticsModal';
import { useStore } from './store/useStore';
import { useFilteredIdeas } from './hooks/useFilteredIdeas';
import { downloadFile, uploadFile, generateExportFilename } from './utils/dataUtils';
import type { Idea } from './types';

function App() {
  const {
    ideas,
    filterAndSort,
    addIdea,
    updateIdea,
    deleteIdea,
    voteIdea,
    setFilter,
    setSort,
    reorderIdeas,
    exportData,
    importData,
    getStatistics
  } = useStore();

  const filteredIdeas = useFilteredIdeas(ideas, filterAndSort.filter, filterAndSort.sort);
  
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [showStats, setShowStats] = useState(false);

  const handleExport = () => {
    const data = exportData();
    downloadFile(data, generateExportFilename());
  };

  const handleImport = async () => {
    try {
      const content = await uploadFile();
      const success = importData(content);
      if (!success) {
        alert('Failed to import data. Please check the file format.');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('Failed to import file.');
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
        <Header
          onShowStats={() => setShowStats(true)}
          onExport={handleExport}
          onImport={handleImport}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FilterControls
            filter={filterAndSort.filter}
            sort={filterAndSort.sort}
            onFilterChange={setFilter}
            onSortChange={setSort}
          />

          <AddIdeaForm onAdd={addIdea} />

          <IdeaList
            ideas={filteredIdeas}
            onVote={voteIdea}
            onEdit={setEditingIdea}
            onDelete={deleteIdea}
            onReorder={reorderIdeas}
          />
        </main>

        <EditIdeaModal
          idea={editingIdea}
          onSave={updateIdea}
          onClose={() => setEditingIdea(null)}
        />

        <StatisticsModal
          isOpen={showStats}
          statistics={getStatistics()}
          onClose={() => setShowStats(false)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;