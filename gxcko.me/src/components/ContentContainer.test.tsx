import {renderWithProviders} from "../../testHelpers/functions/renderWithProviders.tsx";
import ContentContainer from "./ContentContainer.tsx";
import {screen} from "@testing-library/react";

describe('ContentContainer Component Functionality', () => {
    it('should render', () => {
        renderWithProviders(<ContentContainer />);
        expect(screen.getByTestId('contentContainer')).toBeInTheDocument();
    });

    it('should link to youtube', () => {
        renderWithProviders(<ContentContainer />);
        const linkYoutube = screen.getByText('Check out my YouTube')
        expect(linkYoutube).toBeInTheDocument();
        expect(linkYoutube).toHaveAttribute('href', '../../redirect/youtube.html');
    });

    it('should link to twitter', () => {
        renderWithProviders(<ContentContainer />);
        const linkYoutube = screen.getByText('Check out my Twitter')
        expect(linkYoutube).toBeInTheDocument();
        expect(linkYoutube).toHaveAttribute('href', '../../redirect/twitter.html');
    });

    it('should link to github', () => {
        renderWithProviders(<ContentContainer />);
        const linkYoutube = screen.getByText('Check out my GitHub')
        expect(linkYoutube).toBeInTheDocument();
        expect(linkYoutube).toHaveAttribute('href', '../../redirect/github.html');
    });

    it('should link to github repo', () => {
        renderWithProviders(<ContentContainer />);
        const linkYoutube = screen.getByText('View the repo for this website')
        expect(linkYoutube).toBeInTheDocument();
        expect(linkYoutube).toHaveAttribute('href', '../../redirect/github-repo.html');
    });
});

describe('ContentContainer Component Styling', () => {
    it('should apply dark mode', () => {
        renderWithProviders(<ContentContainer />, 'dark');
        expect(screen.getByTestId('contentContainer')).toHaveClass('dark');
    });
});

describe('ContentBubble Styling', () => {
    it('should apply dark mode', () => {
        renderWithProviders(<ContentContainer />, 'dark');
        const bubbles = document.getElementsByClassName('bubble');
        for (let i = 0; i < bubbles.length; i++) {
            expect(bubbles[i]).toHaveClass('dark');
        }
    });
});