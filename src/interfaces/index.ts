import { ProjectType } from '@/enums/ProjectType';

export interface Project {
    id: number;
    name: string;
    type: ProjectType;
    logo: string;
    price: number;
    contractAddress: string;
}

export interface UserProject {
    id: number;
    bookmarked: boolean;
    project: Project;
}
