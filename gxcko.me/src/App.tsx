import CookiePopup from "./components/CookiePopup.tsx";
import DarkModeToggle from "./components/DarkModeToggle.tsx";
import {ThemeProvider} from "./contexts/ThemeContext.tsx";
import BottomBanner from "./components/BottomBanner.tsx";
import {BlurProvider} from "./contexts/BlurContext.tsx";
import ContentContainer from "./components/ContentContainer.tsx";

export default function App() {
    return (
        <ThemeProvider>
            <BlurProvider>
                <div>
                    <DarkModeToggle/>
                    <ContentContainer/>
                    <CookiePopup/>
                    <BottomBanner/>
                </div>
            </BlurProvider>
        </ThemeProvider>
    )
}