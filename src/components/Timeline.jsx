import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import './styles/Timeline.css';

const CACHE_KEY = 'github-repo-data';
const CACHE_EXPIRY_HOURS = 24;
/**
 * Cache shape (localStorage key: "github-repo-data"):
 * {
 *   timestamp: number,       // Date.now() at time of fetch
 *   data: {
 *     [repo: string]: {
 *       repo: string,
 *       description: string,
 *       github: string,      // html_url from GitHub API
 *     }
 *   }
 * }
 */

export default function Timeline() {
  const [repoData, setRepoData] = useState({});
  const [loading, setLoading] = useState(true);

  const getCachedData = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    return JSON.parse(cached);
    } catch (error) {
      console.warn('Error reading GitHub cache:', error);
      return null;
    }
  };

  const isCacheExpired = (timestamp) => Date.now() - timestamp > CACHE_EXPIRY_HOURS * 60 * 60 * 1000;

  const setCachedData = (data) => {
    try {
      const cacheEntry = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
    } catch (error) {
      console.warn('Error saving GitHub cache:', error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepoData() {
      // Always try to load cached data first (even if old).
      const cachedData = getCachedData();
      if (cachedData) setRepoData(cachedData);

      // If cache is expired or doesn't exist, try to fetch fresh data.
      if (!cachedData || isCacheExpired(cachedData.timestamp)) {
        try {
          const results = await Promise.allSettled(
            projects.map(async (project) => {
              const response = await fetch(
                `https://api.github.com/repos/${project.repo}`,
                { signal: controller.signal }
              );
              if (!response.ok) {
                throw new Error(`${project.repo} fetch failed (${response.status})`);
              }
              const data = await response.json();
              return {
                repo: project.repo,
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

          if (Object.keys(meta).length > 0) {
            setRepoData(meta);
            setCachedData(meta);
          }
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.warn('GitHub repo fetch failed:', error);
          }
        }
      }

      setLoading(false);
    }

    loadRepoData();
    return () => controller.abort();
  }, []);

  const enhancedProjects = projects.map((project) => {
    const meta = repoData[project.repo] || {};
    return {
      ...project,
      description: meta.description || project.description || '',
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
