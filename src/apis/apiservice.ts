import { data } from 'react-router-dom';
import type { AccessRequestPayload, AccessRequestResponse, LoginRequest, TokenResponse, UserProfile, UserProfilePayload } from './apiTypes';
import axiosInstance from './axiosInstance';
import type { CustomAxiosRequestConfig } from './axiosInstance';

const apiservice ={
    login: (data: LoginRequest) =>
     axiosInstance.post<TokenResponse>('/api/auth/login', data),

    getUserProfile: (data: UserProfilePayload) =>
     axiosInstance.post<{ userprofile: UserProfile }>(`/user`,data),

    requestAccess: (data: AccessRequestPayload) =>
    axiosInstance.post<boolean>("/api/access/request", data),

}


export default apiservice;
