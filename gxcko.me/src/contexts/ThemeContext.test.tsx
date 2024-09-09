import {fireEvent, render, screen} from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {ThemeProvider, useTheme} from "./ThemeContext.tsx";

// Helper component to test the useBlur hook
const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <>
            <span>Theme is {theme.toString()}</span>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </>
    );
};

describe('ThemeContext', () => {
    it('should start with theme as light', () => {
        render(
            <ThemeProvider>
                <TestComponent/>
            </ThemeProvider>
        );

        expect(screen.getByText('Theme is light')).toBeInTheDocument();
    });

    it('should provide theme and toggleTheme through context and toggle', () => {
        // Render the component within the BlurProvider
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        // Simulate click and check if blur state toggles
        fireEvent.click(screen.getByText('Toggle Theme'));
        expect(screen.getByText('Theme is dark')).toBeInTheDocument();
    });

    it('should throw an error when useTheme is used outside of ThemeProvider', () => {
        // Mock console.error to avoid cluttering test output
        const consoleError = console.error;
        console.error = () => {};

        expect(() => render(<TestComponent />)).toThrowError(
            'useTheme must be used within a ThemeProvider'
        );

        // Restore console.error
        console.error = consoleError;
    });
});

describe('ThemeContext Development Artefacts', () => {
    it('should not send anything in the console when theme is toggled', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByText('Toggle Theme'));

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });
});