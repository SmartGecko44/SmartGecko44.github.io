import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BottomBanner from './BottomBanner';
import {renderWithProviders} from "../../testHelpers/functions/renderWithProviders.tsx";

describe('BottomBanner Component Functionality', () => {
    it('should render without crashing', () => {
        renderWithProviders(<BottomBanner />);
        expect(screen.getByText('© 2024 Gecko!')).toBeInTheDocument();
    });
});

describe('BottomBanner Component Styling', () => {
    it('should start with light mode and not have blur', () => {
        renderWithProviders(<BottomBanner />, 'light');
        expect(screen.getByText('© 2024 Gecko!')).not.toHaveClass('dark');
        expect(screen.getByText('© 2024 Gecko!')).not.toHaveClass('blur');
    });

    it('should not apply blur class when blur is false', () => {
        renderWithProviders(<BottomBanner />, 'light', false);
        expect(screen.getByText('© 2024 Gecko!')).not.toHaveClass('blur');
    });

    it('should apply dark theme class when theme is dark', () => {
        renderWithProviders(<BottomBanner />, 'dark');
        expect(screen.getByTestId('bottomBanner')).toHaveClass('dark');
    })

    it('should apply blur class when blur is true', () => {
        renderWithProviders(<BottomBanner />, 'light', true);
        expect(screen.getByTestId('bottomBanner')).toHaveClass('blur');
    })

    it('should apply blur and dark when both are true', () => {
        renderWithProviders(<BottomBanner />, 'dark', true);
        expect(screen.getByTestId('bottomBanner')).toHaveClass('blur dark');
    });
});

describe('BottomBanner Development Artefacts', () => {
    it('should not send anything in the console when theme is light', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<BottomBanner />, 'light');

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when theme is dark', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<BottomBanner />, 'dark');

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send anything in the console when blur is false', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<BottomBanner />, 'light', false);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when blur is true', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<BottomBanner />, 'light', true);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send anything in the console when blur and theme are false', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<BottomBanner />, 'light', false);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when blur is false and theme is dark', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<BottomBanner />, 'dark', true);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });
});