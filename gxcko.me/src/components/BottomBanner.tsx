import {useTheme} from "../contexts/ThemeContext.tsx";
import {useBlur} from "../contexts/BlurContext.tsx";

export default function BottomBanner() {
    const { theme } = useTheme();
    const { blur } = useBlur();
    return (
        <div id="bottom-banner" className={`${theme === 'dark' ? 'dark' : ''} ${blur ? 'blur' : ''}`}>
            <p>© 2024 Gecko!</p>
        </div>
    )
}