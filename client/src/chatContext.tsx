import React, { createContext, useState, useContext, ReactNode } from 'react';


interface ChatContextType {
    chat: string | null;
    setChat: React.Dispatch<React.SetStateAction<string | null>>;
  }
  
  const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
    return useContext(ChatContext);
};

interface ChatProviderProps{
    children: ReactNode
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [chat, setChat] = useState<string | null>(null);

    return (
        <ChatContext.Provider value={{ chat, setChat }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext