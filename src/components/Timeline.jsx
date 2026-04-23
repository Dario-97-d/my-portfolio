import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import './styles/Timeline.css';

export default function Timeline() {
  const [repoData, setRepoData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepoData() {
      try {
        const results = await Promise.allSettled(
          projects.map(async (project) => {
            const response = await fetch(
              `https://api.github.com/repos/${project.repo}`,
              { signal: controller.signal }
            );
            if (!response.ok) {
              throw new Error(`${project.repo} fetch failed`);
            }
            const data = await response.json();
            return {
              repo: project.repo,
              subtitle: data.name,
              description: data.description,
              github: data.html_url,
            };
          })
        );

        const meta = results.reduce((acc, result) => {
          if (result.status === 'fulfilled') {
            acc[result.value.repo] = result.value;
          }
          return acc;
        }, {});

        setRepoData(meta);
      } catch (error) {
        console.warn('GitHub repo fetch failed:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRepoData();
    return () => controller.abort();
  }, []);

  const enhancedProjects = projects.map((project) => {
    const meta = repoData[project.repo] || {};
    return {
      ...project,
      subtitle: meta.subtitle || project.repo.split('/').pop(),
      description: meta.description || 'Fetching description from GitHub...',
      github: meta.github || `https://github.com/${project.repo}`,
    };
  });

  return (
    <div className="timeline-container">
      <h1 className="timeline-title">My Projects</h1>
      <div className="timeline">
        {enhancedProjects.map((project, index) => (
          <div key={project.id} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className={`timeline-date ${index % 2 === 0 ? 'right' : 'left'}`}>
              {project.date}
            </div>
            <div className={`timeline-content ${index % 2 === 0 ? 'left' : 'right'}`}>
              <ProjectCard project={project} loading={loading} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
