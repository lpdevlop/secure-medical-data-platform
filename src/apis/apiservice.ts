import { data } from 'react-router-dom';
import type { LoginRequest, TokenResponse, UserProfile, UserProfilePayload } from './apiTypes';
import axiosInstance from './axiosInstance';
import type { CustomAxiosRequestConfig } from './axiosInstance';

const apiservice ={
    login: (data: LoginRequest) =>
     axiosInstance.post<{ data: TokenResponse }>('/auth/login', data),

    getUserProfile: (data: UserProfilePayload) =>
     axiosInstance.post<{ userprofile: UserProfile }>(`/user`,data),

}


export default apiservice;
