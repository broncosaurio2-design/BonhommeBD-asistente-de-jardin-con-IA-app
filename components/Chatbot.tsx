
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createChat } from '../services/geminiService';
import type { ChatMessage } from '../types';
import type { Chat } from '@google/genai';
import { LoadingSpinner } from './LoadingSpinner';
import { SendIcon } from './icons/SendIcon';
import { PlantIcon } from './icons/PlantIcon';

const examplePrompts = [
    "¿Cuál es la mejor planta para un balcón con sombra?",
    "¿Cómo me deshago de los pulgones de forma natural?",
    "¿Cuándo debo podar mis rosales?",
];

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current = createChat();
        setMessages([
            { role: 'model', content: "¡Hola! Soy tu asistente de jardinería IA. ¡Pregúntame lo que sea sobre plantas, tierra o técnicas de jardinería!" }
        ]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = useCallback(async (messageText: string) => {
        if (messageText.trim() === '' || loading || !chatRef.current) return;

        const userMessage: ChatMessage = { role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message: messageText });
            const modelMessage: ChatMessage = { role: 'model', content: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: ChatMessage = { role: 'model', content: "Lo siento, tengo problemas para conectarme. Por favor, inténtalo de nuevo más tarde." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    const handleSend = () => {
        sendMessage(input);
    };
    
    const handleExamplePromptClick = (prompt: string) => {
        setInput(prompt); // Show the prompt in the input for a moment for better UX
        sendMessage(prompt);
    };

    return (
        <div className="flex flex-col h-[65vh] max-w-2xl mx-auto w-full">
            <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4 mb-4">
                {messages.length <= 1 && !loading && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm font-semibold text-green-800 mb-3">¿No sabes por dónde empezar? Prueba con esto:</p>
                        <div className="flex flex-wrap gap-2">
                            {examplePrompts.map((prompt, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleExamplePromptClick(prompt)}
                                    className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && (
                            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                                <PlantIcon className="text-green-700"/>
                            </div>
                        )}
                        <div className={`max-w-md p-3 rounded-xl ${
                            msg.role === 'user'
                                ? 'bg-green-600 text-white rounded-br-none'
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}>
                            <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                            <PlantIcon className="text-green-700"/>
                        </div>
                        <div className="max-w-md p-3 rounded-xl bg-gray-100 text-gray-800 rounded-bl-none">
                            <LoadingSpinner />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-auto pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Haz una pregunta de jardinería..."
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
                        aria-label="Enviar mensaje"
                    >
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
