import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, User, Bot, Settings } from 'lucide-react';
import { ConversationMessage, ConversationStyle } from '../types';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: '1',
      text: 'Hey! I\'m here to help you manage your schedule. You can tell me about meetings, deadlines, or ask me to reschedule things. What\'s up?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStyle, setCurrentStyle] = useState<ConversationStyle>({
    id: 'friend',
    name: 'Friend',
    personality: 'casual',
    icon: '😊'
  });
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationStyles: ConversationStyle[] = [
    { id: 'friend', name: 'Friend', personality: 'casual', icon: '😊' },
    { id: 'professional', name: 'Professional', personality: 'formal', icon: '💼' },
    { id: 'parent', name: 'Parent', personality: 'caring', icon: '🤗' },
    { id: 'coach', name: 'Coach', personality: 'motivational', icon: '💪' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response based on conversation style
    setTimeout(() => {
      const responses = getStyleBasedResponse(inputValue, currentStyle);
      const aiMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        text: responses,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const getStyleBasedResponse = (input: string, style: ConversationStyle): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('meeting') || lowerInput.includes('schedule')) {
      switch (style.id) {
        case 'friend':
          return "Got it! So you want to schedule a meeting? What time works for you? I'll check if you're free and let you know if there are any conflicts. 😊";
        case 'professional':
          return "I understand you'd like to schedule a meeting. Please provide the preferred time, and I'll analyze your calendar for availability and potential conflicts.";
        case 'parent':
          return "Sweetie, let's get this meeting scheduled for you. When would you like it? I'll make sure it doesn't interfere with anything important you have planned.";
        case 'coach':
          return "Great! Let's lock in that meeting time. What's your target time? I'll help you optimize your schedule to make it happen! 💪";
        default:
          return "I'll help you schedule that meeting. What time would you prefer?";
      }
    }
    
    if (lowerInput.includes('conflict') || lowerInput.includes('busy')) {
      switch (style.id) {
        case 'friend':
          return "Uh oh, looks like you've got a scheduling conflict! 😅 Both events seem important. Which one matters more to you? I can help figure out the best way to reschedule.";
        case 'professional':
          return "I've detected a scheduling conflict. Both appointments have high priority. Please indicate your preference, and I'll suggest optimal rescheduling options.";
        case 'parent':
          return "Oh dear, you have two things at the same time! Don't worry, we'll sort this out. Which one is more important to you right now?";
        case 'coach':
          return "Challenge accepted! You've got a conflict but we're going to solve this together. Let's prioritize and find the perfect solution! 🚀";
        default:
          return "There's a scheduling conflict. Which event would you prefer to keep at the original time?";
      }
    }

    return "I'm here to help with your schedule! Tell me what you need assistance with.";
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="text-2xl">{currentStyle.icon}</div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">AI Assistant</h2>
              <p className="text-gray-600 text-sm">Conversation style: {currentStyle.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={currentStyle.id}
              onChange={(e) => {
                const style = conversationStyles.find(s => s.id === e.target.value);
                if (style) setCurrentStyle(style);
              }}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm"
            >
              {conversationStyles.map(style => (
                <option key={style.id} value={style.id}>
                  {style.icon} {style.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-purple-500 text-white'
                }`}>
                  {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                <div className={`p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-2 opacity-70 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 text-white shadow-lg animate-pulse'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Mic size={20} />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tell me about your schedule..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;