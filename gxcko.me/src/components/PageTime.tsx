import { useState, useEffect } from "react";
import { useBlur } from "../contexts/BlurContext.tsx";

export default function PageTime() {
    const [seconds, setSeconds] = useState(0);
    const { blur } = useBlur();

    const [width, setWidth] = useState(window.innerWidth);

    const ScreenWidth = () => {
        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    };

    ScreenWidth();

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []); // Empty dependency array to run only once on mount

    const secondsToString = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secondsString = seconds % 60;

        if (hours || minutes || secondsString) {
            return `${hours ? (hours < 10 ? "0" + hours + "h:" : hours + "h:") : ""}${
                minutes ? (minutes < 10 ? "0" + minutes + "m:" : minutes + "m:") : ""
            }${secondsString < 10 ? "0" + secondsString + "s" : secondsString + "s"}`;
        } else {
            return "none";
        }
    };

    return (
        <div id="pageTime" className={blur ? 'blur' : ""}>
            {width >= 800 && (
                <span>Time wasted on this page: </span>
            )}
            <span>{secondsToString(seconds)}</span>
            {seconds >= 3600 && (
                <>
                    <br />
                    <span>Why are you still here?</span>
                </>
            )}
        </div>
    );
}