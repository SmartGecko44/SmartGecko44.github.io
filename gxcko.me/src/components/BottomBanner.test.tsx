import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BottomBanner from './BottomBanner';
import {renderWithProviders} from "../../testHelpers/functions/renderWithProviders.tsx";

describe('BottomBanner Component', () => {
    it('should render without crashing', () => {
        renderWithProviders(<BottomBanner />);
        expect(screen.getByText('© 2024 Gecko!')).toBeInTheDocument();
    });

    it('should not apply dark theme class when theme is light', () => {
        renderWithProviders(<BottomBanner />, 'light');
        expect(screen.getByText('© 2024 Gecko!')).not.toHaveClass('dark');
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
