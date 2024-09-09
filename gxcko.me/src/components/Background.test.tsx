import {describe, vi} from "vitest";
import {renderWithProviders} from "../../testHelpers/functions/renderWithProviders.tsx";
import Background from "./Background.tsx";

describe('Background Component Functionality', () => {
    it('should not render in light mode', () => {
        renderWithProviders(<Background dialogOpen={false} />, 'light');
        expect(document.getElementById('background')).not.toBeInTheDocument();
    });

    it('should not render when dialog is open', () => {
        renderWithProviders(<Background dialogOpen={true} />, 'dark');
        expect(document.getElementById('background')).not.toBeInTheDocument();
    });

    it('should render in dark mode', () => {
        renderWithProviders(<Background dialogOpen={false} />, 'dark');
        expect(document.getElementById('background')).toBeInTheDocument();
    });

    it('should not render in light mode with dialog open', () => {
        renderWithProviders(<Background dialogOpen={true} />, 'light');
        expect(document.getElementById('background')).not.toBeInTheDocument();
    });
});

describe('Background Development Artefacts', () => {
    it('should not send anything in the console when dialogOpen is false', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<Background dialogOpen={false}/>)

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when dialogOpen is true', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<Background dialogOpen={true}/>)

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send anything if theme is light', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<Background dialogOpen={false}/>, 'light')

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message if theme is dark', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<Background dialogOpen={false}/>, 'dark')

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send anything if theme is light and dialog is open', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<Background dialogOpen={true}/>, 'light')

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message if theme is dark and dialog is open', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<Background dialogOpen={true}/>, 'dark')

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });
})