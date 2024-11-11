import {describe, expect} from "vitest";
import {fireEvent, screen} from "@testing-library/react";
import CookiePopup, {getCookie} from "./CookiePopup.tsx";
import {renderWithProviders} from "../../testHelpers/functions/renderWithProviders.tsx";
import {clearCookies} from "../../testHelpers/functions/clearCookies.tsx";
import * as Sentry from "@sentry/browser";

// Mock the entire Sentry module
vi.mock('@sentry/browser', () => ({
    captureException: vi.fn(),
}));

describe('CookiePopup Component Functionality', () => {
    beforeEach(clearCookies)

    it('should display when cookiesAccepted cookie does not exist', () => {
        renderWithProviders(<CookiePopup />);
        expect(screen.getByTestId('cookiePopup')).toBeInTheDocument();
    });

    it('should not display when cookiesAccepted cookie exists', () => {
        document.cookie = 'cookiesAccepted=true';
        renderWithProviders(<CookiePopup />);
        expect(screen.queryByText('This website uses cookies')).not.toBeInTheDocument();
    });

    it('should hide when decline is clicked', () => {
        renderWithProviders(<CookiePopup />);
        fireEvent.click(screen.getByText('Decline'));
        expect(document.cookie).not.toContain('cookiesAccepted=true');
        // expect cookie popup to have hide class
        expect(screen.getByTestId('cookiePopup')).toHaveClass('hide');
    });

    it('should set cookie and hide when accept is clicked', () => {
        renderWithProviders(<CookiePopup />);
        fireEvent.click(screen.getByText('Accept'));
        expect(document.cookie).toContain('cookiesAccepted=true');
        expect(screen.queryByText('This website uses cookies')).not.toBeInTheDocument();
    });
});

describe('CookiePopup Component Styling', () => {
    beforeEach(clearCookies)
    it('should start with light mode and not have blur', () => {
        renderWithProviders(<CookiePopup />, 'light');
        expect(screen.getByTestId('cookiePopup')).not.toHaveClass('dark');
        expect(screen.getByTestId('cookiePopup')).not.toHaveClass('blur');
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

describe('CookiePopup Development Artefacts', () => {
    beforeEach(clearCookies);
    it('should not send anything in the console when theme is light', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<CookiePopup />, 'light');

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when theme is dark', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<CookiePopup />, 'dark');

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send anything in the console when blur is false', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<CookiePopup />, 'light', false);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when blur is true', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<CookiePopup />, 'light', true);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send anything in the console when cookiesAccepted cookie exists', () => {
        document.cookie = 'cookiesAccepted=true';
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<CookiePopup />);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when cookiesAccepted cookie does not exist', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<CookiePopup />);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when decline is clicked', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<CookiePopup />);
        fireEvent.click(screen.getByText('Decline'));

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send anything in the console when accept is clicked', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<CookiePopup />);
        fireEvent.click(screen.getByText('Accept'));

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });
});

describe('CookiePopup Error Handling', () => {
    beforeEach(() => {
        // Mock document.cookie to throw a SecurityError
        Object.defineProperty(document, 'cookie', {
            get: () => { throw new DOMException('Failed to read the \'cookie\' property from \'Document\': Cookies are disabled inside \'data:\' URLs.', 'SecurityError'); }
        });
    });

    afterEach(() => {
        // Restore document.cookie and any other mocks after each test
        vi.restoreAllMocks();
    });

    it('should throw a Sentry exception when cookie storage cannot be accessed', () => {
        const result = getCookie('cookiesAccepted');

        // Assert that Sentry.captureException was called with the right error and options
        expect(Sentry.captureException).toHaveBeenCalledWith(expect.any(DOMException), {
            level: 'error',
            tags: { handled: true }
        });

        expect(result).toBeNull();
    });
});