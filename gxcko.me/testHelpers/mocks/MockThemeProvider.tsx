// MockThemeProvider.tsx
import React, { ReactNode } from 'react';
import { ThemeContext } from '../../src/contexts/ThemeContext'; // Adjust the import path

interface MockThemeProviderProps {
    children: ReactNode;
    theme: 'light' | 'dark';
}

export const MockThemeProvider: React.FC<MockThemeProviderProps> = ({ children, theme }) => {
    const toggleTheme = () => {}; // No-op for toggleTheme since we are only mocking

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
