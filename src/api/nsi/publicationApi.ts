import { Moment } from 'moment';
import instance from '../instance'
import { AxiosResponse } from 'axios';

export type StudyCreationDTO = {
    studyId?: string;
    title?: string,
    description?: string,
    content?: string,
    tags?: string[]
}

export type StudySummaryDTO = {
    id?: string;
    title?: string,
    description?: string,
    content?: string,
    tags?: string[],
    date: Moment
}

export type Study = {
    id?: string;
    title?: string,
    description?: string,
    content?: string,
    tags?: string[],
    date?: Moment,
    authorName?: string;
    comments?: Comment[];
}

export type Comment = {
    content?: string;
    authorName?: string;
    date?: Moment;
}

export type CommentDTO = {
    studyId?: string;
    content?: string;
}

class PublicationApi {
    static async publishAsync(studyId?: string, token?: string) {
        return instance.post(`/study/publish`, studyId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async createAsync(studyCreationDTO?: StudyCreationDTO, token?: string) {
        return instance.post<StudyCreationDTO, AxiosResponse<string>>(`/study`, studyCreationDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async updateAsync(studyCreationDTO?: StudyCreationDTO, token?: string) {
        return instance.put<StudyCreationDTO, AxiosResponse<string>>(`/study`, studyCreationDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async commentAsync(commentDTO?: CommentDTO, token?: string) {
        return instance.patch<CommentDTO>(`/study/comment`, commentDTO, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }


    static async getPendingPublication(id?: string, token?: string) {
        return instance.get<Study>(`/study/pending/details/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }


    static async getPendingPublications(token?: string) {
        return instance.get<Study[]>(`/study/pending`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async getPublishedPublication(id?: string) {
        return instance.get<Study>(`/study/published/details/${id}`);
    }

    static async getPublishedPublications() {
        return instance.get<StudySummaryDTO[]>(`/study/published`);
    }

    static async getLastPublishedPublications() {
        return instance.get<StudySummaryDTO[]>(`/study/latest`);
    }
}

export default PublicationApi;