import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {getCookie, setCookie} from "../components/CookiePopup.tsx";

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (getCookie('darkMode')) {
            const darkMode = getCookie('darkMode');
            return darkMode === 'true' ? 'dark' : 'light';
        } else if (getCookie('cookiesAccepted') && !getCookie('darkMode')) {
            return 'light';
        } else {
            return 'light';
        }
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        if (getCookie('darkMode')) {
            setCookie('darkMode', theme === 'light', 90)
        } else if (getCookie('cookiesAccepted') && !getCookie('darkMode')) {
            setCookie('darkMode', theme === "light", 90);
        } else {
        }
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};