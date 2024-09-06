import {describe, expect} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import CookiePopup from "./CookiePopup.tsx";
import React from "react";
import {MockBlurProvider} from "../../testHelpers/mocks/MockBlurProvider.tsx";
import {MockThemeProvider} from "../../testHelpers/mocks/MockThemeProvider.tsx";

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

describe('CookiePopup Component', () => {
    beforeEach(() => {
        // Clear cookies
        document.cookie.split(';').forEach((c) => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    });

    it('should display when cookiesAccepted cookie does not exist', () => {
        renderWithProviders(<CookiePopup />);
        expect(screen.getByTestId('cookiePopup')).toBeInTheDocument();
    });

    it('should not display when cookiesAccepted cookie exists', () => {
        document.cookie = 'cookiesAccepted=true';
        renderWithProviders(<CookiePopup />);
        expect(screen.queryByText('This website uses cookies')).not.toBeInTheDocument();
    });

    it('should set cookie and hide when accept is clicked', () => {
        renderWithProviders(<CookiePopup />);
        fireEvent.click(screen.getByText('Accept'));
        expect(document.cookie).toContain('cookiesAccepted=true');
        expect(screen.queryByText('This website uses cookies')).not.toBeInTheDocument();
    });

    it('should hide when decline is clicked', () => {
        renderWithProviders(<CookiePopup />);
        fireEvent.click(screen.getByText('Decline'));
        expect(document.cookie).not.toContain('cookiesAccepted');
        // expect cookie popup to have hide class
        expect(screen.getByTestId('cookiePopup')).toHaveClass('hide');
    });
});