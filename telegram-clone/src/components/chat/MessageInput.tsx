import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Smile, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Message } from '../../types';

interface MessageInputProps {
  onSendMessage: (text: string, replyToMessage?: Message) => void;
  isTyping: boolean;
  replyToMessage?: Message | null;
  onCancelReply?: () => void;
}

interface FormData {
  message: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage,
  isTyping,
  replyToMessage,
  onCancelReply
}) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const [rows, setRows] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messageValue = watch('message', '');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newRows = Math.min(
        5,
        Math.max(
          1,
          Math.ceil(textareaRef.current.scrollHeight / 24)
        )
      );
      setRows(newRows);
      textareaRef.current.style.height = `${newRows * 24}px`;
    }
  }, [messageValue]);

  const onSubmit = (data: FormData) => {
    if (data.message.trim()) {
      onSendMessage(data.message, replyToMessage || undefined);
      reset();
      if (onCancelReply) {
        onCancelReply();
      }
      if (textareaRef.current) {
        textareaRef.current.style.height = '24px';
        setRows(1);
      }
    }
  };

  return (
    <div className="border-t border-border-light dark:border-border-dark p-3 bg-bg-light dark:bg-bg-dark">
      {isTyping && (
        <div className="flex items-center mb-2 px-4 text-text-light-secondary dark:text-text-dark-secondary text-sm">
          <span className="mr-2">Typing</span>
          <span className="flex space-x-1">
            <span className="w-1 h-1 bg-gray-500 rounded-full animate-typing"></span>
            <span className="w-1 h-1 bg-gray-500 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-1 h-1 bg-gray-500 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></span>
          </span>
        </div>
      )}

      {replyToMessage && (
        <div className="flex items-center justify-between mb-2 px-4 py-2 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg">
          <div className="flex-1 truncate">
            <div className="text-sm font-medium text-primary">Reply to message</div>
            <div className="text-sm truncate text-text-light-secondary dark:text-text-dark-secondary">
              {replyToMessage.text}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancelReply}
            className="ml-2"
            aria-label="Cancel reply"
          >
            <X size={16} />
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-2">
        <Button 
          type="button" 
          variant="icon" 
          aria-label="Add emoji"
        >
          <Smile size={20} />
        </Button>
        
        <div className="flex-grow relative">
          <textarea
            {...register('message')}
            placeholder="Type a message..."
            rows={rows}
            className="w-full resize-none px-4 py-2 rounded-2xl bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-light-primary dark:text-text-dark-primary outline-none border border-transparent focus:border-primary"
            ref={(e) => {
              textareaRef.current = e;
              register('message').ref(e);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
        </div>
        
        <Button 
          type="submit" 
          variant="icon" 
          className={messageValue.trim() ? 'text-primary' : 'text-gray-400'}
          disabled={!messageValue.trim()}
        >
          <Send size={20} />
        </Button>
      </form>
    </div>
  );
};