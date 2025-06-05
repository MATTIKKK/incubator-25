// import { useState, useCallback } from 'react';
// import { generateId } from '../utils/generateId';

// type AiResponse = {
//   text: string;
//   id: string;
// };

// const AI_RESPONSES = [
//   "I'm here to help! What can I assist you with today?",
//   "That's an interesting question. Let me think about it...",
//   "I understand what you're asking. Here's what I can tell you...",
//   "Thanks for sharing! Is there anything specific you'd like to know about that?",
//   "I'm processing your request. This might take a moment...",
//   "I'd be happy to help with that. Let me provide some information...",
//   "Great question! The answer depends on several factors...",
//   "I appreciate your patience. Let me find the best answer for you.",
//   "That's a complex topic. Let me break it down for you...",
//   "I'm learning all the time, and your question helps me improve!",
// ];

// export const useAI = () => {
//   const [isLoading, setIsLoading] = useState(false);
  
//   const getResponse = useCallback((message: string): Promise<AiResponse> => {
//     return new Promise((resolve) => {
//       setIsLoading(true);
      
//       const thinkingTime = 1000 + Math.random() * 2000;
      
//       setTimeout(() => {
//         const randomIndex = Math.floor(Math.random() * AI_RESPONSES.length);
//         const response = AI_RESPONSES[randomIndex];
        
//         setIsLoading(false);
//         resolve({
//           text: response,
//           id: generateId(),
//         });
//       }, thinkingTime);
//     });
//   }, []);
  
//   return {
//     getResponse,
//     isLoading,
//   };
// };

import { useState, useCallback } from "react";
import { generateId } from "../utils/generateId";
import { rephraseMessage } from "../api/ai";

export type AiResponse = {
  text: string;
  id: string;
};

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getResponse = useCallback(
    async (message: string): Promise<AiResponse> => {
      setIsLoading(true);

      try {
        const rewritten: string = await rephraseMessage(message);

        return {
          text: rewritten,
          id: generateId(),
        };
      } catch (error) {
        console.error("AI call failed:", error);
        return {
          text: "Sorry, I couldn’t generate a response at the moment.",
          id: generateId(),
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    getResponse,
    isLoading,
  };
};