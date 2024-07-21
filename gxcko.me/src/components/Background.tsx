import {useTheme} from "../contexts/ThemeContext.tsx";

interface BackgroundProps {
    dialogOpen: boolean;
}

export default function Background({ dialogOpen }: BackgroundProps) {
    const {theme} = useTheme();

    if (theme === 'light') {
        return null;
    } else if (dialogOpen) {
        return null;
    }

    return (
        <div id="background"></div>
    );
}
