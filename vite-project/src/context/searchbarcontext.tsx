import {createContext, useContext} from "react"

type InputValueContextType = {
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const InputValueContext = createContext<InputValueContextType | undefined>(undefined)

export const InputValueProvider = InputValueContext.Provider

export function useInputValue() {
    const context = useContext(InputValueContext)
    if (!context) {
        throw new Error('useInputValue must be used within a InputValueProvider');
    }
    return context
};