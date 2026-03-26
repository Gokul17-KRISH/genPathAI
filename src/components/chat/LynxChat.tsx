import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function LynxChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi! I'm Lynx, your AI learning companion. How can I help you with your path today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      if (apiKey) {
        // True AI via Gemini API
        const prompt = `You are Lynx, a highly empathetic and knowledgeable AI learning assistant. 
        The user is navigating a personalized learning platform. 
        User says: "${userMsg.content}"
        Constraint: Respond in 1 to 3 sentences maximum. Be warm, supportive, acknowledge any stress, and provide crisp technical answers if asked.`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          addBotMessage(data.candidates[0].content.parts[0].text);
          return;
        }
      }
    } catch (err) {
      console.warn("Gemini API error, falling back to local engine", err);
    }

    // Simulated AI Processing (Fallback if no API key or if API fails)
    setTimeout(() => {
      const lowerInput = userMsg.content.toLowerCase();
      let responseText = "";

      // Greetings
      if (lowerInput.match(/\b(hi|hello|hey|greetings|wassup)\b/)) {
        responseText = "Hello there! I'm Lynx. How are you feeling about your learning journey today?";
      } 
      // Definitions / Tech Questions
      else if (lowerInput.includes("what is") || lowerInput.includes("explain") || lowerInput.includes("how to")) {
        if (lowerInput.includes("full stack") || lowerInput.includes("fullstack")) {
          responseText = "Full stack refers to the entirety of a computer system or application, meaning you work on both the front-end (what users see) and back-end (the server and database). It's a broad skill to learn, so pacing yourself is key!";
        } else {
          responseText = "That's a great technical question! In simple terms, think of it as a tool that solves a specific problem in a larger system. To really understand it, I recommend building a tiny 1-page project focused just on that concept.";
        }
      }
      // Empathy / Stress / Burnout
      else if (lowerInput.match(/\b(stress|tired|hard|difficult|overwhelmed|give up|frustrated|lost|sad|bad)\b/)) {
        responseText = "I hear you, and your feelings are completely valid. Learning complex technical concepts is exhausting and everyone hits this wall. Please step away for a short break—your brain needs time to process everything. You've got this!";
      }
      // Gratitude
      else if (lowerInput.match(/\b(thanks|thank you|awesome|great|good|nice)\b/)) {
        responseText = "You're very welcome! I'm always right here if you need support or guidance. Let's keep moving forward together!";
      }
      // Fallback
      else {
        responseText = "I'm listening and I completely understand. Your learning progress is a journey, not a race. What specific concept would you like us to explore next?";
      }

      addBotMessage(responseText);
    }, 1200);
  };

  const addBotMessage = (text: string) => {
    const assistantMsg: Message = {
      id: Date.now().toString() + "-bot",
      role: 'assistant',
      content: text
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-indigo-600 text-white flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide flex items-center gap-1">
                    Lynx AI <Sparkles className="w-3 h-3 text-indigo-200" />
                  </h3>
                  <div className="text-[10px] text-indigo-100 font-medium uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 opacity-80" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    {msg.role === 'user' ? (
                      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                        {user?.picture ? (
                          <img src={user.picture} alt="User" className="w-full h-full object-cover" />
                        ) : (
                          <UserCircle className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                        <Bot className="w-4 h-4 text-indigo-600" />
                      </div>
                    )}
                  </div>
                  
                  {/* Bubble */}
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-indigo-600 text-white rounded-tr-sm" 
                      : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-end gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Lynx anything..."
                  className="w-full max-h-32 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none leading-relaxed"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-sm shrink-0 flex items-center justify-center h-[44px] w-[44px]"
                >
                  <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
                  Powered by GenPath AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300 relative",
          isOpen ? "bg-slate-800 text-white hover:bg-slate-900" : "bg-indigo-600 text-white hover:bg-indigo-700"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              {/* Notification dot */}
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-indigo-600 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
