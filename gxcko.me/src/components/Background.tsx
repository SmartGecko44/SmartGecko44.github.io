import {useTheme} from "../contexts/ThemeContext.tsx";

interface BackgroundProps {
    dialogOpen: boolean;
}

export default function Background({ dialogOpen }: Readonly<BackgroundProps>) {
    const {theme} = useTheme();

    if (theme === 'light' || dialogOpen) {
        return null;
    }

    return (
        <div data-testit="background" id="background"></div>
    );
}
