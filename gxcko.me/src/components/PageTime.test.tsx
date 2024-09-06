import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PageTime from './PageTime';
import { MockBlurProvider } from '../../testHelpers/mocks/MockBlurProvider';

// Helper function to render component with context providers
const renderWithProviders = (children: React.ReactElement, blur: boolean = false) => {
    return render(
        <MockBlurProvider blur={blur}>
            {children}
        </MockBlurProvider>
    );
};

describe('PageTime Component', () => {
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