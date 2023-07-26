import { useQuery } from 'react-query';
import { useApiContext } from '../../context/apiContext';
import { StudyApi } from '../nsi';

const queryKeys = {
    lastStudiesRequest: "LAST_STUDIES_REQUEST",
    publicationRequest: "PUBLICATION_REQUEST",
    pendingPublicationsRequest: "PENDING_PUBLICATIONS_REQUEST",
    publishedPublicationsRequest: "PUBLISHED_PUBLICATIONS_REQUEST"
};

export const useLastPublications = () => {
    return useQuery(queryKeys.lastStudiesRequest, () => StudyApi.getLastPublishedPublications().then((response) => response.data ?? []));
}

export const usePublishedPublication = (id?: string) => {
    return useQuery(queryKeys.publicationRequest + id, () => StudyApi.getPublishedPublication(id).then((response) => response.data));
}

export const usePendingPublication = (id?: string) => {
    const { apiKey } = useApiContext();
    return useQuery(queryKeys.publicationRequest + id, () => StudyApi.getPendingPublication(id, apiKey).then((response) => response.data));
}

export const usePendingPublications = () => {
    const { apiKey } = useApiContext();
    return useQuery(queryKeys.pendingPublicationsRequest, () => StudyApi.getPendingPublications(apiKey).then((response) => response.data));
}

export const usePublishedPublications = () => {
    return useQuery(queryKeys.publishedPublicationsRequest, () => StudyApi.getPublishedPublications().then((response) => response.data));
}