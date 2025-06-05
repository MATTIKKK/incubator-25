import { Layout } from './components/layout/Layout';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatProvider } from './contexts/ChatContext';

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <Layout />
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;