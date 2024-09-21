import React, { ReactNode, useState } from 'react';
import { ThemeContext } from '../../src/contexts/ThemeContext'; // Adjust the import path

interface MockThemeProviderProps {
    children: ReactNode;
    theme: 'light' | 'dark'; // Rename to theme
}

export const MockThemeProvider: React.FC<MockThemeProviderProps> = ({ children, theme }) => {
    // State to manage the adjusted theme (adjTheme)
    let [adjTheme, setAdjTheme] = useState<'light' | 'dark'>(theme);

    // Toggle between 'light' and 'dark'
    const toggleTheme = () => {
        setAdjTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme: adjTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};