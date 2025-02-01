import CookiePopup from "./components/CookiePopup.tsx";
import DarkModeToggle from "./components/DarkModeToggle.tsx";
import {ThemeProvider} from "./contexts/ThemeContext.tsx";
import BottomBanner from "./components/BottomBanner.tsx";
import {BlurProvider} from "./contexts/BlurContext.tsx";
import ContentContainer from "./components/ContentContainer.tsx";
import PageTime from "./components/PageTime.tsx";
import {useState} from "react";
import MyProjects from "./components/MyProjects.tsx";

export default function App() {
    const [showProjects, setShowProjects] = useState(false);

    const toggleProjects = () => {
        setShowProjects(!showProjects);
        console.log(showProjects);
    }

    return (
        <ThemeProvider>
            <BlurProvider>
                {showProjects && <MyProjects toggleProjects={toggleProjects}/>}
                <>
                    <DarkModeToggle/>
                    <ContentContainer toggleProjects={toggleProjects}/>
                    <CookiePopup/>
                    <BottomBanner/>
                    <PageTime/>
                </>
            </BlurProvider>
        </ThemeProvider>
    )
}