import React, {useEffect, useRef} from "react";
import {useTheme} from "../contexts/ThemeContext.tsx";
import {checkCookiesAccepted, getCookie, setCookie} from "./CookiePopup.tsx";
import {useBlur} from "../contexts/BlurContext.tsx";
import Background from "./Background.tsx";

const DarkModeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme();
    const {blur, toggleBlur} = useBlur();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogShown = useRef(false);
    const dialogOpen = useRef(false);

    useEffect(() => {
        if (!getCookie('dialogShown') && !dialogShown.current) {
            showDialog();
            dialogShown.current = true;
        }
    }, []);

    // Function to show the dialog box
    function showDialog() {
        const dialog = dialogRef.current;

        if (dialog) {
            dialogOpen.current = true;
            if (typeof dialog.showModal === "function") {
                dialog.showModal();
            } else {
                dialog.setAttribute("open", "true");
                dialog.classList.add('fallback');
            }
            setTimeout(() => {
                dialog.classList.add('visible');
            }, 50);
            toggleBlur();
            if (checkCookiesAccepted()) {
                setCookie('dialogShown', true, 30);
            } else {
                console.log('Cookies are not enabled');
            }
        } else {
            console.warn('Dialog element not found');
            return;
        }
        checkCloseClick();
    }

    function closeDialog() {
        const dialog = dialogRef.current;
        const confirmBtn = document.getElementById('confirm');

        if (dialog) {
            dialog.classList.remove('visible');
            setTimeout(() => {
                if (typeof dialog.close === "function") {
                    // Browser supports close, so use it
                    dialog.close();
                } else {
                    // Fallback for browsers that don't support close
                    dialog.removeAttribute("open");
                    dialog.classList.remove('fallback');
                }
                if (confirmBtn === null) console.warn('Confirm button not found');
                document.removeEventListener('click', handler);
                toggleBlur();
                dialogOpen.current = false;
            }, 1000); // Delay equal to the transition duration
        } else {
            console.warn('Dialog element not found');
        }
    }

    function checkCloseClick() {
        const confirmBtn = document.getElementById('confirm');

        if (!confirmBtn) {
            console.warn('Confirm button found');
        }
        document.addEventListener('click', handler);
    }

    function handler(event: MouseEvent) {
        const dialog = dialogRef.current;
        const darkToggle = document.getElementById('dark-toggle');
        const isClickInside = dialog?.contains(event.target as Node);
        const isDarkToggle = darkToggle?.contains(event.target as Node);
        const isOpen = dialog?.classList.contains('visible');

        if (isOpen && !isClickInside && !isDarkToggle) {
            document.removeEventListener('click', handler);
            closeDialog();
        }
    }

    function handleConfirm() {
        toggleTheme();
        closeDialog();
    }

    return (
        <div id="darkModeMenu">
            <noscript>
                <style>
                    {`
                    #darkModeDia {
                        display: none;
                    }
                    `}
                </style>
            </noscript>
            <Background dialogOpen={dialogOpen.current}/>
            <dialog ref={dialogRef} id="darkModeDia" className={theme === 'dark' ? 'dark' : ''}>
                <p>Would you like to toggle the dark mode?</p>
                <div className="button-container">
                    <button id="cancel" onClick={closeDialog}>No</button>
                    <button id="confirm" onClick={handleConfirm}>Yes</button>
                </div>
            </dialog>
            <img id="dark-toggle" src="../../icons/contrast.svg" alt="Dark Mode Icon"
                 className={`${theme === 'dark' ? 'dark' : ''} ${blur ? 'blur' : ''}`} onClick={showDialog}/>
        </div>
    )
}

export default DarkModeToggle;
