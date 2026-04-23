import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import './styles/ProjectCard.css';

const techIconUrls = {
  '.NET': '/tech/dotnet.svg',
  API: '/tech/api.svg',
  'API Ninjas': '/tech/apininjas.svg',
  'ASP.NET Core': '/tech/aspnetcore.svg',
  Blazor: '/tech/blazor.svg',
  'Bootstrap 4': '/tech/bootstrap4.svg',
  'C#': '/tech/csharp.svg',
  Console: '/tech/dotnetcli.svg',
  CSS3: '/tech/css.svg',
  Desktop: '/tech/desktop.svg',
  'EntityFramework Core': '/tech/efcore.svg',
  'File Sync': '/tech/filesync.svg',
  JavaScript: '/tech/javascript.svg',
  HTML5: '/tech/html.svg',
  MAUI: '/tech/maui.svg',
  OpenWeather: '/tech/openweather.svg',
  React: '/tech/react.svg',
  WinForms: '/tech/winforms.svg',
  Default: '/tech/default.svg'
};

export default function ProjectCard({ project }) {
  const [activeTech, setActiveTech] = useState(null);

  const handleTechClick = (tech) => {
    setActiveTech((currentTech) => (currentTech === tech ? null : tech));
  };

  const showTechTooltip = (tech) => setActiveTech(tech);
  const hideTechTooltip = () => setActiveTech(null);

  return (
    <div className="project-card">
      <div className="project-image-container">
        <img src={project.image} alt={project.title} className="project-image" />
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-footer">
          {project.tech?.length ? (
            <div className="project-tech-row">
              {project.tech.map((tech) => {
                const iconUrl = techIconUrls[tech] || techIconUrls.Default;
                return (
                  <button
                    key={tech}
                    type="button"
                    className="tech-icon-button"
                    onPointerEnter={() => showTechTooltip(tech)}
                    onPointerLeave={(event) => event.pointerType === 'mouse' && hideTechTooltip()}
                    onFocus={() => showTechTooltip(tech)}
                    onBlur={hideTechTooltip}
                    onClick={() => handleTechClick(tech)}
                    title={tech}
                    aria-label={`Tech: ${tech}`}
                  >
                    <img src={iconUrl} alt={tech} className="tech-icon" />
                    {activeTech === tech ? (
                      <div className="tech-tooltip" role="tooltip">
                        {tech}
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}

          <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
            <ExternalLink size={20} />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
