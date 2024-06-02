import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext(null);

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
