// Helper function to render component with context providers
import {describe} from "vitest";
import {MockBlurProvider} from "../../testHelpers/mocks/MockBlurProvider.tsx";
import {MockThemeProvider} from "../../testHelpers/mocks/MockThemeProvider.tsx";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle.tsx";
import React from "react";

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

describe('DarkModeToggle Component', () => {
    it('should be displayed', () => {
        renderWithProviders(<DarkModeToggle/>)
        expect(screen.getByTestId('darkModeMenuFull')).toBeInTheDocument();
    });

    it('should open the dialogue', () => {
        renderWithProviders(<DarkModeToggle/>)
        fireEvent.click(screen.getByTestId('darkToggleImage'))
        expect(screen.getByRole('dialog')).toBeInTheDocument();
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

    it.skip('should close the dialogue on background click', async () => {
        renderWithProviders(<DarkModeToggle/>)
        fireEvent.click(screen.getByTestId('darkToggleImage'))

        // Wait for the dialog to appear
        await waitFor(() => {
            expect(screen.getByRole('dialog')).toBeInTheDocument()
            expect(screen.getByTestId('cancelButton')).toBeInTheDocument()
        })

        fireEvent.mouseDown(document)

        // Wait for the dialog to disappear
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
    });
})