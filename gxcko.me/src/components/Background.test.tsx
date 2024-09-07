import {describe} from "vitest";
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