import {useTheme} from "../contexts/ThemeContext.tsx";

interface Project {
    id: number;
    title: string;
    imageUrl: string;
    link: string;
}

interface MyProjectsProps {
    toggleProjects: () => void;
}

export default function MyProjects({ toggleProjects }: Readonly<MyProjectsProps>) {
    const {theme} = useTheme();
    const projects: Project[] = [
        {
            id: 1,
            title: "Spigot Admin Toys",
            imageUrl: "../../images/Admin-Toys.png",
            link: "/projects/spigot-admin-toys"
        },
        {id: 2, title: "Gxcko.me", imageUrl: "../../images/Gxcko.png", link: "/projects/gxcko"},
    ];

    const handleClick = (link: string): void => {
        window.location.href = link;
    };

    return (
        <div data-testid="myProjectsDiv" id="my-projects" className={theme === 'dark' ? 'dark' : ''}>
            <div
                data-testid="myProjectsPopup"
                id="my-projects-popup"
                className={`${theme === 'dark' ? 'dark' : ''} popup-overlay`}>
                <div className={`popup-content ${theme === 'dark' ? 'dark' : ''}`}>
                    <div className={`project-list ${theme === 'dark' ? 'dark' : ''}`}>
                        {projects.map((project) => (
                            <li key={project.id} className={`project-item ${theme === 'dark' ? 'dark' : ''}`}
                                onClick={() => handleClick(project.link)}>
                                <img src={project.imageUrl} alt={project.title}
                                     className={`project-image ${theme === 'dark' ? 'dark' : ''}`}/>
                                <span
                                    className={`project-title ${theme === 'dark' ? 'dark' : ''}`}>{project.title}</span>
                            </li>
                        ))}
                    </div>
                </div>
                <button onClick={toggleProjects}>Nevermind</button>
            </div>
        </div>
    );
}