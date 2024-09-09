import CookiePopup from "./components/CookiePopup.tsx";
import DarkModeToggle from "./components/DarkModeToggle.tsx";
import {ThemeProvider} from "./contexts/ThemeContext.tsx";
import BottomBanner from "./components/BottomBanner.tsx";
import {BlurProvider} from "./contexts/BlurContext.tsx";
import ContentContainer from "./components/ContentContainer.tsx";
import PageTime from "./components/PageTime.tsx";

export default function App() {
    return (
        <ThemeProvider>
            <BlurProvider>
                <>
                    <DarkModeToggle/>
                    <ContentContainer/>
                    <CookiePopup/>
                    <BottomBanner/>
                    <PageTime/>
                </>
            </BlurProvider>
        </ThemeProvider>
    )
}