import React from 'react';
import { ChatProvider } from './context/ChatContext';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <ChatProvider>
      <AppLayout />
    </ChatProvider>
  );
}

export default App;