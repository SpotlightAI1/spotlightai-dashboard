
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface ChatAgentProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatAgent = ({ isOpen, onToggle }: ChatAgentProps) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your healthcare analytics assistant. I can help you analyze metrics, explain trends, and answer questions about your dashboard data. What would you like to know?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on your current data, I can see that cardiology admissions have increased 12.3% this month, primarily driven by interventional procedures.',
        'The orthopedics service line is performing well with a 15.2% increase in surgeries. Dr. James Wilson is leading in joint replacements.',
        'Your market share growth of 2.3% in cardiology puts you ahead of Metro Health System. I recommend focusing on patient satisfaction to maintain this advantage.',
        'The average length of stay reduction to 3.2 days is excellent and contributes to cost savings. This trend is particularly strong in your cardiology unit.',
        'Emergency department volume shows seasonal patterns. I can help you analyze staffing optimization based on these trends.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const assistantMessage = { role: 'assistant', content: randomResponse };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);

    setInputMessage('');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={onToggle}
          className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <span>Analytics Assistant</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-64 overflow-y-auto space-y-3 p-2 bg-gray-50 rounded-lg">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex items-start space-x-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                )}
                <div 
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about your analytics..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {[
              'Show cardiology trends',
              'Top performing physicians',
              'Market share analysis',
              'Revenue by service line'
            ].map((suggestion, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInputMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
