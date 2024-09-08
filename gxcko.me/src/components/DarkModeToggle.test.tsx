// Helper function to render component with context providers
import {describe, vi} from "vitest";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle.tsx";
import {renderWithProviders} from "../../testHelpers/functions/renderWithProviders.tsx";

describe('DarkModeToggle Component Functionality', () => {
    it('should be displayed', () => {
        renderWithProviders(<DarkModeToggle/>)
        expect(screen.getByTestId('darkModeMenuFull')).toBeInTheDocument()
    });

    it('should open the dialogue', () => {
        renderWithProviders(<DarkModeToggle/>)
        fireEvent.click(screen.getByTestId('darkToggleImage'))
        expect(screen.getByRole('dialog')).toBeInTheDocument()
    });

    it('should close the dialogue', async () => {
        renderWithProviders(<DarkModeToggle/>)
        fireEvent.click(screen.getByTestId('darkToggleImage'))

        // Wait for the cancel button to appear
        await waitFor(() => {
            expect(screen.getByTestId('cancelButton')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByTestId('cancelButton'))

        // Wait for the dialog to disappear
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
    });

    it('should close on confirm', async () => {
        renderWithProviders(<DarkModeToggle/>)
        fireEvent.click(screen.getByTestId('darkToggleImage'))

        // Wait for the confirm button to appear
        await waitFor(() => {
            expect(screen.getByTestId('confirmButton')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByTestId('confirmButton'))

        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
    });

    it('should close the dialogue on background click', async () => {
        renderWithProviders(<DarkModeToggle/>);
        fireEvent.click(screen.getByTestId('darkToggleImage'));

        // Wait for the dialog to appear
        await waitFor(() => {
            expect(screen.getByTestId('cancelButton')).toBeInTheDocument()
        })

        fireEvent.click(document);

        // Wait for the dialog to disappear
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
    });

    it('should toggle the theme on confirm', async () => {
        renderWithProviders(<DarkModeToggle/>)
        expect(screen.getByTestId('darkToggleImage')).not.toHaveClass('dark')
        fireEvent.click(screen.getByTestId('darkToggleImage'))

        await waitFor(() => {
            expect(screen.getByTestId('confirmButton')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByTestId('confirmButton'))

        expect(screen.getByTestId('darkDialog')).toHaveClass('dark')
    });
});

describe('darkToggleImage Component Styling', () => {
    it('should start with light mode and not have blur', () => {
        renderWithProviders(<DarkModeToggle/>)
        expect(screen.getByTestId('darkToggleImage')).not.toHaveClass('dark')
        expect(screen.getByTestId('darkToggleImage')).not.toHaveClass('blur')
    });

    it('should apply dark theme and not have blur', () => {
        renderWithProviders(<DarkModeToggle/>, 'dark')
        expect(screen.getByTestId('darkToggleImage')).toHaveClass('dark')
        expect(screen.getByTestId('darkToggleImage')).not.toHaveClass('blur')
    });

    it('should apply blur filter and not have dark theme', () => {
        renderWithProviders(<DarkModeToggle/>, 'light', true)
        expect(screen.getByTestId('darkToggleImage')).not.toHaveClass('dark')
        expect(screen.getByTestId('darkToggleImage')).toHaveClass('blur')
    });

    it('should apply dark theme and blur', () => {
        renderWithProviders(<DarkModeToggle/>, 'dark', true)
        expect(screen.getByTestId('darkToggleImage')).toHaveClass('dark')
        expect(screen.getByTestId('darkToggleImage')).toHaveClass('blur')
    });
});

describe('darkDialog Component Styling', () => {
    it('should start with light mode and not have blur', () => {
        renderWithProviders(<DarkModeToggle/>)
        fireEvent.click(screen.getByTestId('darkToggleImage'))
        expect(screen.getByTestId('darkDialog')).not.toHaveClass('dark')
        expect(screen.getByTestId('darkDialog')).not.toHaveClass('blur')
    });

    it('should apply dark theme and not have blur', () => {
        renderWithProviders(<DarkModeToggle/>, 'dark')
        fireEvent.click(screen.getByTestId('darkToggleImage'))
        expect(screen.getByTestId('darkDialog')).toHaveClass('dark')
        expect(screen.getByTestId('darkDialog')).not.toHaveClass('blur')
    });
});

describe('darkModeToggle Development Artefacts', () => {
    it('should not send anything in the console', async () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<DarkModeToggle/>)
        expect(screen.getByTestId('darkToggleImage')).not.toHaveClass('dark')
        fireEvent.click(screen.getByTestId('darkToggleImage'))

        await waitFor(() => {
            expect(screen.getByTestId('confirmButton')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByTestId('confirmButton'))

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });
})