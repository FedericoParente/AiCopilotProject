import { Project } from './types';

export const fetchMockProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Apollo Program', members: [1, 2, 3, 4] },
        { id: 2, name: 'Gemini Mission', members: [2, 3] },
        { id: 3, name: 'Mercury Ops', members: [1, 4] },
      ]);
    }, 500);
  });
};
