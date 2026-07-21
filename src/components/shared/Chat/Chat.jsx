'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { BsSend, BsRobot, BsPerson } from 'react-icons/bs';
import { parseMarkdown } from './utils';
import styles from './Chat.module.scss';

export const Chat = () => {
   const [input, setInput] = useState('');
   const { messages, sendMessage, status } = useChat();
   const isLoading = status === 'submitted' || status === 'streaming';
   const messagesEndRef = useRef(null);
   const inputRef = useRef(null);

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   useEffect(() => {
      inputRef.current?.focus();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!input.trim()) return;
      sendMessage({ text: input });
      setInput('');
   };

   return (
      <div className={styles.chat}>
         <div className={styles.messages}>
            {messages.length === 0 && (
               <div className={styles.emptyState}>
                  <BsRobot size={48} />
                  <h3>Asistente de compras</h3>
                  <p>¿En qué puedo ayudarte? Puedo buscar productos, hacer recomendaciones y responder preguntas sobre la tienda.</p>
               </div>
            )}

            {messages.map((message) => (
               <div
                  key={message.id}
                  className={`${styles.message} ${message.role === 'user' ? styles.user : styles.assistant}`}
               >
                  <div className={styles.avatar}>
                     {message.role === 'user' ? <BsPerson size={18} /> : <BsRobot size={18} />}
                  </div>
                  <div className={styles.content}>
                     {message.parts.map((part, i) => {
                        if (part.type === 'text') {
                           return <p key={`${message.id}-${i}`}>{parseMarkdown(part.text)}</p>;
                        }
                        return null;
                     })}
                  </div>
               </div>
            ))}

            {isLoading && (
               <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.avatar}>
                     <BsRobot size={18} />
                  </div>
                  <div className={styles.content}>
                     <div className={styles.typing}>
                        <span></span>
                        <span></span>
                        <span></span>
                     </div>
                  </div>
               </div>
            )}

            <div ref={messagesEndRef} />
         </div>

         <form onSubmit={handleSubmit} className={styles.form}>
            <input
               ref={inputRef}
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Escribe tu mensaje..."
               className={styles.input}
               disabled={isLoading}
            />
            <button
               type="submit"
               className={styles.sendButton}
               disabled={isLoading || !input.trim()}
            >
               <BsSend size={18} />
            </button>
         </form>
      </div>
   );
};
