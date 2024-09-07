import {describe, expect} from "vitest";
import {fireEvent, screen} from "@testing-library/react";
import CookiePopup from "./CookiePopup.tsx";
import {renderWithProviders} from "../../testHelpers/functions/renderWithProviders.tsx";

describe('CookiePopup Component Functionality', () => {
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

describe('CookiePopup Component Styling', () => {
    it('should apply light theme class when theme is light', () => {
        renderWithProviders(<CookiePopup />, 'light');
        expect(screen.getByTestId('cookiePopup')).not.toHaveClass('dark');
    });

    it('should apply dark theme class when theme is dark', () => {
        renderWithProviders(<CookiePopup />, 'dark');
        expect(screen.getByTestId('cookiePopup')).toHaveClass('dark');
    });

    it('should apply blur class when blur is true', () => {
        renderWithProviders(<CookiePopup />, 'light', true);
        expect(screen.getByTestId('cookiePopup')).toHaveClass('blur');
    });

    it('should not apply blur class when blur is false', () => {
        renderWithProviders(<CookiePopup />, 'light', false);
        expect(screen.getByTestId('cookiePopup')).not.toHaveClass('blur');
    });
});