import {useState} from "react";
import {useBlur} from "../contexts/BlurContext.tsx";

export default function PageTime() {

    const [seconds, setSeconds] = useState(0);

    setTimeout(() => {
        setSeconds(seconds + 1);
    }, 1000);

    const {blur} = useBlur();

    const secondsToString = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        const secondsString = Math.floor(seconds % 3600 % 60);
        console.log(hours + "h" + minutes + "m" + secondsString + "s");
        return `${hours === 0 ? "" : hours < 10 ? "0" + hours + "h" + ":" : hours + "h" + ":"}${minutes === 0 && hours === 0 ? "" : minutes < 10 ? "0" + minutes + "m" + ":" : minutes + "m" + ":"}${secondsString === 0 && minutes === 0 && hours === 0 ? "" : secondsString < 10 ? "0" + secondsString + "s" : secondsString + "s"}`;
    }

    return (
        <div id="pageTime" className={blur ? 'blur' : ""}>
            <p>Time wasted on this page: {secondsToString(seconds)}</p>
            {seconds > 3600 ? <p>Why are you still here?</p> : ""}
        </div>
    )
}