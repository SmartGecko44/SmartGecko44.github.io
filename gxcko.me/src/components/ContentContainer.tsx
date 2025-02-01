import {useTheme} from "../contexts/ThemeContext.tsx";
import {useBlur} from "../contexts/BlurContext.tsx";

interface ContentContainerProps {
    toggleProjects: () => void;
}

export default function ContentContainer({ toggleProjects }: Readonly<ContentContainerProps>) {
    const {theme} = useTheme()
    const {blur} = useBlur()

    return (
        <div data-testid="contentContainer" id="content-container" className={`${theme === 'dark' ? 'dark' : ''} ${blur ? 'blur' : ''}`}>
            <h1 id="title">Hai! Welcome to my about me page! (WIP)</h1>
            <br/>
            <br/>
            <div id="link" className={theme === 'dark' ? 'dark' : ''}>
                <a href="../../redirect/youtube.html"
                   className={`bubble ${theme === 'dark' ? 'dark' : ''}`} target="_blank"
                   rel="noopener noreferrer" tabIndex={0}>Check out
                    my YouTube</a>
                <br/>
                <br/>
                <div className="half-br"></div>
                <br/>
                <a href="../../redirect/twitter.html"
                   className={`bubble ${theme === 'dark' ? 'dark' : ''}`} target="_blank"
                   rel="noopener noreferrer" tabIndex={0}>Check out
                    my Twitter</a>
                <br/>
                <br/>
                <div className="half-br"></div>
                <br/>
                <a href="../../redirect/github.html"
                   className={`bubble ${theme === 'dark' ? 'dark' : ''}`} target="_blank"
                   rel="noopener noreferrer" tabIndex={0}>Check out
                    my GitHub</a>
                <br/>
                <div className="half-br"></div>
                <br/>
                <br/>
                <a href="../../redirect/github-repo.html"
                   className={`bubble ${theme === 'dark' ? 'dark' : ''}`} target="_blank"
                   rel="noopener noreferrer" tabIndex={0}>View
                    the repo for this website</a>
                <br/>
                <div className="half-br"></div>
                <br/>
                <br/>
                <button onClick={toggleProjects}>View my projects</button>
            </div>
        </div>
    )
}