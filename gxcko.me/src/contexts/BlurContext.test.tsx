import {fireEvent, render, screen} from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BlurProvider, useBlur } from './BlurContext';

// Helper component to test the useBlur hook
const TestComponent = () => {
    const { blur, toggleBlur } = useBlur();
    return (
        <>
            <span>Blur is {blur.toString()}</span>
            <button onClick={toggleBlur}>Toggle Blur</button>
        </>
    );
};

describe('BlurContext', () => {
    it('should start with blur false', () => {
        render(
            <BlurProvider>
                <TestComponent/>
            </BlurProvider>
        );

        expect(screen.getByText('Blur is false')).toBeInTheDocument();
    });

    it('should provide blur and toggleBlur through context and toggle', () => {
        // Render the component within the BlurProvider
        render(
            <BlurProvider>
                <TestComponent />
            </BlurProvider>
        );

        // Simulate click and check if blur state toggles
        fireEvent.click(screen.getByText('Toggle Blur'));
        expect(screen.getByText('Blur is true')).toBeInTheDocument();
    });

    it('should throw an error when useBlur is used outside of BlurProvider', () => {
        // Mock console.error to avoid cluttering test output
        const consoleError = console.error;
        console.error = () => {};

        expect(() => render(<TestComponent />)).toThrowError(
            'useBlur must be used within a BlurProvider'
        );

        // Restore console.error
        console.error = consoleError;
    });
});

describe('BlurContext Development Artefacts', () => {
    it('should not send anything in the console when blur is toggled', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        render(
            <BlurProvider>
                <TestComponent />
            </BlurProvider>
        );

        fireEvent.click(screen.getByText('Toggle Blur'));

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });
});