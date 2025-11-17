import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { chatbotApi } from '../api/chatbot';
import './Chatbot.css';

const Chatbot = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; text: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ type: 'bot', text: 'Olá! Como posso ajudá-lo hoje?' }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !isAuthenticated) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await chatbotApi.sendMessage(userMessage);
      setMessages((prev) => [...prev, { type: 'bot', text: response.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: 'Desculpe, ocorreu um erro. Por favor, tente novamente.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Assistente Virtual</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chatbot-message bot">
                <span className="typing-indicator">...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
            />
            <button onClick={handleSend} disabled={loading}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;


