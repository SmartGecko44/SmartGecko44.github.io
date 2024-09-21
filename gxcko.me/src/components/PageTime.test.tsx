// noinspection JSConstantReassignment

import { screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PageTime from './PageTime';
import {renderWithProviders} from "../../testHelpers/functions/renderWithProviders.tsx";

describe('PageTime Component Functionality', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should display the initial time correctly', () => {
        renderWithProviders(<PageTime />);
        expect(screen.getByText('Time wasted on this page:')).toBeInTheDocument();
        expect(screen.getByText('none')).toBeInTheDocument();
    });

    it('should update the time every second', () => {
        renderWithProviders(<PageTime />);
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText('01s')).toBeInTheDocument();
    });

    it('should display the message after one hour', () => {
        renderWithProviders(<PageTime />);
        act(() => {
            vi.advanceTimersByTime(3600 * 1000); // Advance by 1 hour (3600 seconds)
        });
        expect(screen.getByText('Why are you still here?')).toBeInTheDocument();
    });
});

describe('PageTime Component Styling', () => {
    it('should not overlap with BottomBanner', () => {
        window.innerWidth = 799;

        window.dispatchEvent(new Event('resize'));

        renderWithProviders(<PageTime />);

        expect(screen.queryByTestId("OptText")).not.toBeInTheDocument();
    });

    it('should overlap with BottomBanner', () => {
        window.innerWidth = 800;

        window.dispatchEvent(new Event('resize'));

        renderWithProviders(<PageTime />);

        expect(screen.getByTestId("OptText")).toBeInTheDocument;
    });
});

describe('PageTime Development Artefacts', () => {
    it('should not send anything in the console', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<PageTime />);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });
})