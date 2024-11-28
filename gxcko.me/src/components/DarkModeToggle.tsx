import React, {useEffect, useRef, useState} from "react";
import {useTheme} from "../contexts/ThemeContext.tsx";
import {checkCookiesAccepted, getCookie, setCookie} from "./CookiePopup.tsx";
import {useBlur} from "../contexts/BlurContext.tsx";
import Background from "./Background.tsx";
import contrastIcon from './assets/icons/contrast.svg';

const DarkModeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme();
    const {blur, toggleBlur} = useBlur();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogShown = useRef(false);
    const dialogOpen = useRef(false);

    // State to control the visibility of the buttons
    const [showCancelBtn, setShowCancelBtn] = useState(false);
    const [showConfirmBtn, setShowConfirmBtn] = useState(false);

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
            }

            // Set timeouts for button visibility
            setTimeout(() => {
                setShowCancelBtn(true);
            }, 250);

            setTimeout(() => {
                setShowConfirmBtn(true);
            }, 750);
        } else {
            console.error('Dialog element not found');
            return;
        }
        checkCloseClick();
    }

    function closeDialog() {
        const dialog = dialogRef.current;

        if (dialog) {
            dialog.classList.remove('visible');
            setTimeout(() => {
                setShowCancelBtn(false);
                setShowConfirmBtn(false);
            }, 1000)


            setTimeout(() => {
                if (typeof dialog.close === "function") {
                    // Browser supports close, so use it
                    dialog.close();
                } else {
                    // Fallback for browsers that don't support close
                    dialog.removeAttribute("open");
                    dialog.classList.remove('fallback');
                }
                document.removeEventListener('click', handler);
                toggleBlur();
                dialogOpen.current = false;
            }, 1000); // Delay equal to the transition duration
        } else {
            console.error('Dialog element not found');
        }
    }

    function checkCloseClick() {
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

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            showDialog();
        }
    }

    return (
        <div data-testid="darkModeMenuFull" id="darkModeMenu">
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
            <dialog ref={dialogRef} data-testid="darkDialog" id="darkModeDia" className={theme === 'dark' ? 'dark' : ''}>
                <p>Would you like to toggle the dark mode?</p>
                <div className="button-container">
                    {!showCancelBtn && <div data-testid="cancelButtonPlaceholder" className={"button-placeholder"}/>}
                    {showCancelBtn &&
                        <button data-testid="cancelButton" id="cancel" onClick={closeDialog} tabIndex={0} className="button-appear">No</button>}
                    {!showConfirmBtn && <div className={"button-placeholder"}/>}
                    {showConfirmBtn && <button data-testid="confirmButton" id="confirm" onClick={handleConfirm} tabIndex={0}
                                               className="button-appear">Yes</button>}
                </div>
            </dialog>
            <img data-testid="darkToggleImage" id="dark-toggle" src={contrastIcon} alt="Dark Mode Icon"
                 className={`${theme === 'dark' ? 'dark' : ''} ${blur ? 'blur' : ''}`} onClick={showDialog}
                 tabIndex={dialogOpen.current ? -1 : 0}
                 role={"button"} onKeyDown={handleKeyDown}/>
        </div>
    )
}

export default DarkModeToggle;
