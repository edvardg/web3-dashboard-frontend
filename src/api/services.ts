import api from './index';
import { Project, UserProject } from '@/interfaces';

// Authentication Service
export const authService = {
    signIn: async (walletAddress: string, message: string, signature: string) => {
        const response = await api.post('/users/signin', { walletAddress, message, signature });
        return response.data;
    },
};

// Project Service
export const projectService = {
    fetchProjects: async (key: string, token: string): Promise<Project[]> => {
        const response = await api.get('/projects', {
            params: { key },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    fetchTrackedProjects: async (token: string): Promise<UserProject[]> => {
        const response = await api.get('/users/tracked-projects', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    addTrackedProject: async (token: string, projectId: number, bookmarked: boolean): Promise<void> => {
        await api.post(
            '/users/tracked-projects',
            { projectId, bookmarked },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    },
};
