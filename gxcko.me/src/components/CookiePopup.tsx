import {useEffect, useState} from "react";
import {useTheme} from "../contexts/ThemeContext.tsx";
import {useBlur} from "../contexts/BlurContext.tsx";

// Function to set a cookie
export function setCookie(name: string, value: boolean, days: number) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get a cookie
export function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (const element of ca) {
        let c = element.trim();
        if (c.startsWith(nameEQ)) {
            return c.substring(nameEQ.length);
        }
    }
    return null;
}

export function checkCookiesAccepted(): boolean {
    return getCookie('cookiesAccepted') === 'true';
}

export default function CookiePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const {theme} = useTheme();
    const {blur} = useBlur();

    useEffect(() => {
        if (getCookie('cookiesAccepted')) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        setCookie('cookiesAccepted', true, 90);
        setIsVisible(false);
        setCookie('darkMode', theme === 'dark', 90);
    };

    const handleDecline = () => {
        setIsVisible(false);
    }

    if (!getCookie('cookiesAccepted')) {
        return (
            <div id="cookiePopup"
                 className={`${isVisible ? 'show' : 'hide'} ${theme === 'dark' ? 'dark' : ''} ${blur ? 'blur' : ''}`}>
                <p>This website uses cookies</p>
                <div className="button-container">
                    <button id="decline" onClick={handleDecline}>Decline</button>
                    <button id="accept" onClick={handleAccept}>Accept</button>
                </div>
            </div>
        )
    } else {
        return null;
    }
}