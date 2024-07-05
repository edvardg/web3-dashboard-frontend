import { create } from 'zustand';
import { projectService } from '@/api/services';
import { Project, UserProject } from '@/interfaces';

interface ProjectStore {
    projects: Project[];
    trackedProjects: UserProject[];
    fetchProjects: (key: string, token: string) => Promise<void>;
    fetchTrackedProjects: (token: string) => Promise<void>;
    addTrackedProject: (token: string, projectId: number, bookmarked: boolean) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    trackedProjects: [],
    fetchProjects: async (key: string, token: string) => {
        try {
            const data = await projectService.fetchProjects(key, token);
            set({ projects: data });
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    },
    fetchTrackedProjects: async (token: string) => {
        try {
            const data = await projectService.fetchTrackedProjects(token);
            set({ trackedProjects: data });
        } catch (error) {
            console.error('Failed to fetch tracked projects:', error);
        }
    },
    addTrackedProject: async (token: string, projectId: number, bookmarked: boolean) => {
        try {
            await projectService.addTrackedProject(token, projectId, bookmarked);
        } catch (error) {
            console.error('Failed to add tracked project:', error);
        }
    },
}));
