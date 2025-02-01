import {renderWithProviders} from "../../testHelpers/functions/renderWithProviders.tsx";
import ContentContainer from "./ContentContainer.tsx";
import {screen} from "@testing-library/react";

const toggleProjects = () => {
    // Placeholder function for now
    return
}

describe('ContentContainer Component Functionality', () => {
    it('should render', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />);
        expect(screen.getByTestId('contentContainer')).toBeInTheDocument();
    });

    it('should link to youtube', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />);
        const linkYoutube = screen.getByText('Check out my YouTube')
        expect(linkYoutube).toBeInTheDocument();
        expect(linkYoutube).toHaveAttribute('href', '../../redirect/youtube.html');
    });

    it('should link to twitter', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />);
        const linkYoutube = screen.getByText('Check out my Twitter')
        expect(linkYoutube).toBeInTheDocument();
        expect(linkYoutube).toHaveAttribute('href', '../../redirect/twitter.html');
    });

    it('should link to github', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />);
        const linkYoutube = screen.getByText('Check out my GitHub')
        expect(linkYoutube).toBeInTheDocument();
        expect(linkYoutube).toHaveAttribute('href', '../../redirect/github.html');
    });

    it('should link to github repo', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />);
        const linkYoutube = screen.getByText('View the repo for this website')
        expect(linkYoutube).toBeInTheDocument();
        expect(linkYoutube).toHaveAttribute('href', '../../redirect/github-repo.html');
    });
});

describe('ContentContainer Component Styling', () => {
    it('should start with light mode and not have blur', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />);
        expect(screen.getByTestId('contentContainer')).not.toHaveClass('dark');
        expect(screen.getByTestId('contentContainer')).not.toHaveClass('blur');
    });

    it('should apply dark mode', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />, 'dark');
        expect(screen.getByTestId('contentContainer')).toHaveClass('dark');
    });

    it('should apply blur', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />, 'light', true);
        expect(screen.getByTestId('contentContainer')).toHaveClass('blur');
    });
});

describe('ContentBubble Styling', () => {
    it('should apply dark mode', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />, 'dark');
        const bubbles = document.getElementsByClassName('bubble');
        for (let i = 0; i < bubbles.length; i++) {
            expect(bubbles[i]).toHaveClass('dark');
        }
    });

    it('should apply light mode', () => {
        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />, 'light');
        const bubbles = document.getElementsByClassName('bubble');
        for (let i = 0; i < bubbles.length; i++) {
            expect(bubbles[i]).not.toHaveClass('dark');
        }
    });
});

describe('ContentContainer Development Artefacts', () => {
    it('should not send anything in the console when theme is light', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />, 'light');

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when theme is dark', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />, 'dark');

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send anything in the console when blur is false', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />, 'light', false);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should not send a message in the console when blur is true', () => {
        const consoleLogSpy = vi.spyOn(console, 'log');

        renderWithProviders(<ContentContainer toggleProjects={toggleProjects} />, 'light', true);

        expect(consoleLogSpy).not.toHaveBeenCalled();
    });
});