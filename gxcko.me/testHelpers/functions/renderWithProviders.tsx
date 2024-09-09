// Helper function to render component with context providers
import {render} from "@testing-library/react";
import React from "react";
import {MockThemeProvider} from "../mocks/MockThemeProvider.tsx";
import {MockBlurProvider} from "../mocks/MockBlurProvider.tsx";

export const renderWithProviders = (children: React.ReactElement, theme: 'light' | 'dark' = 'light', blur: boolean = false) => {
    return render(
        <MockThemeProvider theme={theme}>
            <MockBlurProvider blur={blur}>
                {children}
            </MockBlurProvider>
        </MockThemeProvider>
    );
};