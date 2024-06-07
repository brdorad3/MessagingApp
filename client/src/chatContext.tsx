import React, { createContext, useState, useContext } from 'react';


interface ChatContextType {
    chat: string | null;
    setChat: React.Dispatch<React.SetStateAction<string | null>>;
  }
  
  const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
    return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState(null);

    return (
        <ChatContext.Provider value={{ chat, setChat }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext