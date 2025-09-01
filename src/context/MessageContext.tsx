import {createContext, type ReactNode, useContext, useState} from "react";

type MessageContextType = {
    messages: string[],
    clearMessages: () => void,
    addMessage: (message: string) => void,
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

const MessageProvider = ({children}: { children: ReactNode }) => {
    const [messages, setMessages] = useState<string[]>([])

    const clearMessages = () => setMessages([])

    const addMessage = (message: string) => {
        setMessages(prevMessages => [...prevMessages, message])
    }

    return (
        <MessageContext.Provider value={{messages, addMessage, clearMessages}}>
            {children}
        </MessageContext.Provider>
    )
}


const useMessages = () => {
    const context = useContext(MessageContext)
    if (context === undefined) {
        throw new Error("useMessages must be used within the context")
    }
    return context
}

// eslint-disable-next-line react-refresh/only-export-components
export {MessageProvider, useMessages}
