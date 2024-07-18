import React, { createContext, ReactNode, useContext, useState } from 'react';

type BlurContextType = {
    blur: boolean;
    toggleBlur: () => void;
};

const BlurContext = createContext<BlurContextType | undefined>(undefined);

interface BlurProviderProps {
    children: ReactNode;
}

export const BlurProvider: React.FC<BlurProviderProps> = ({ children }) => {
    const [blur, setBlur] = useState(false);

    const toggleBlur = () => {
        setBlur(prevBlur => !prevBlur);
    };

    return (
        <BlurContext.Provider value={{ blur, toggleBlur }}>
            {children}
        </BlurContext.Provider>
    );
};

export const useBlur = (): BlurContextType => {
    const context = useContext(BlurContext);
    if (!context) {
        throw new Error('useBlur must be used within a BlurProvider');
    }
    return context;
}