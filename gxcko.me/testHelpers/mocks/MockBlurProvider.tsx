// MockBlurProvider.tsx
import React, { ReactNode } from 'react';
import { BlurContext } from '../../src/contexts/BlurContext'; // Adjust the import path

interface MockBlurProviderProps {
    children: ReactNode;
    blur: boolean;
}

export const MockBlurProvider: React.FC<MockBlurProviderProps> = ({ children, blur }) => {
    const toggleBlur = () => {}; // No-op for toggleBlur since we are only mocking

    return (
        <BlurContext.Provider value={{ blur, toggleBlur }}>
            {children}
        </BlurContext.Provider>
    );
};
