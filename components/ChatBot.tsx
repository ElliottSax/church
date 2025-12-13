"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";
import { getSimpleResponse } from "@/lib/chatbot-simple";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  followUp?: string[];
}

const initialQuickQuestions = [
  "What is RLDS?",
  "Tell me about Joseph Smith III",
  "How are you different from Mormons?",
  "What is the Restoration movement?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello and welcome! I'm the Minneapolis Community of Christ chatbot, here to answer your questions.

I'm an AI assistant with comprehensive knowledge about:
• Community of Christ history (RLDS/Restoration movement)
• Our beliefs and practices
• Local congregation information
• Worship times and programs

What would you like to know about Community of Christ?`,
      sender: "bot",
      timestamp: new Date(),
      followUp: ["What is the RLDS church?", "Tell me about the Restoration movement", "How are you different from LDS?", "When is worship?"]
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Update conversation history
    const newHistory = [...conversationHistory, messageText];
    setConversationHistory(newHistory.slice(-5)); // Keep last 5 messages for context

    // Generate bot response with slight delay for natural feel
    setTimeout(() => {
      try {
        const result = getSimpleResponse(messageText);

        const botMessage: Message = {
          id: messages.length + 2,
          text: result.response,
          sender: "bot",
          timestamp: new Date(),
          followUp: result.followUp
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error generating chatbot response:', error);
        const errorMessage: Message = {
          id: messages.length + 2,
          text: "I apologize, but I'm having trouble responding right now. Please try again or call us at (612) 555-1234.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 800); // Fixed delay for consistent response time
  };

  const currentFollowUp = messages.length > 0
    ? messages[messages.length - 1].followUp || (messages.length === 1 ? initialQuickQuestions : [])
    : initialQuickQuestions;

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all hover:scale-110 flex items-center justify-center z-50 animate-pulse"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[95vw] max-w-[420px] h-[600px] max-h-[80vh] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-secondary-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-semibold">Minneapolis Community of Christ</h3>
                <p className="text-xs text-primary-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-800 rounded-full p-1.5 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-secondary-50 to-white">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } animate-fadeIn`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 shadow-sm ${
                    message.sender === "user"
                      ? "bg-primary-600 text-white"
                      : "bg-white text-secondary-900 border border-secondary-100"
                  }`}
                >
                  <div
                    className={`text-sm leading-relaxed ${
                      message.sender === "bot" ? "prose-sm max-w-none" : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: message.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                        .replace(/\n\n/g, '</p><p class="mt-3">')
                        .replace(/\n/g, '<br>')
                        .replace(/^/, '<p>')
                        .replace(/$/, '</p>')
                        .replace(/•/g, '&bull;')
                        .replace(/📞/g, '<span class="text-lg">📞</span>')
                        .replace(/✉️/g, '<span class="text-lg">✉️</span>')
                        .replace(/🌐/g, '<span class="text-lg">🌐</span>')
                        .replace(/🕊️/g, '<span class="text-lg">🕊️</span>')
                    }}
                  />
                  {message.sender === "bot" && (
                    <div className="text-xs text-secondary-400 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-secondary-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Follow-up Questions */}
          {!isTyping && currentFollowUp.length > 0 && (
            <div className="px-4 py-2 bg-secondary-50 border-t border-secondary-100">
              <p className="text-xs text-secondary-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                {currentFollowUp.map((question, index) => (
                  <button
                    key={`${question}-${index}`}
                    onClick={() => handleSend(question)}
                    className="text-xs px-3 py-1.5 bg-white text-secondary-700 rounded-full hover:bg-primary-50 hover:text-primary-700 transition-all transform hover:scale-105 border border-secondary-200 shadow-sm flex items-center gap-1"
                  >
                    <ChevronRight size={12} />
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-secondary-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 border border-secondary-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm placeholder-secondary-400"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isTyping}
                className="px-4 py-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-secondary-400 mt-2 text-center">
              Or call us at (612) 555-1234
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}