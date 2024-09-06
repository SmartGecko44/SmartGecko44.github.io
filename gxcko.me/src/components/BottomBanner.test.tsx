import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BottomBanner from './BottomBanner';
import { MockThemeProvider } from '../../testHelpers/mocks/MockThemeProvider'; // Import the mock provider
import { MockBlurProvider } from '../../testHelpers/mocks/MockBlurProvider'; // Import the mock provider

// Helper function to render component with context providers
const renderWithProviders = (children: React.ReactElement, theme: 'light' | 'dark' = 'light', blur: boolean = false) => {
    return render(
        <MockThemeProvider theme={theme}>
            <MockBlurProvider blur={blur}>
                {children}
            </MockBlurProvider>
        </MockThemeProvider>
    );
};

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

    //TODO: Add working support for contexts
});
