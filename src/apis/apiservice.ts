import { data } from 'react-router-dom';
import type { AccessRequestPayload, AccessRequestResponse, LoginRequest, MedicalHistoryRecord, PatientHistoryProps, TokenResponse, UserProfile, UserProfilePayload } from './apiTypes';
import axiosInstance from './axiosInstance';
import type { CustomAxiosRequestConfig } from './axiosInstance';

const apiservice ={
    login: (data: LoginRequest) =>
     axiosInstance.post<TokenResponse>('/api/auth/login', data),

    getUserProfile: (data: UserProfilePayload) =>
     axiosInstance.post<{ userprofile: UserProfile }>(`/user`,data),

    requestAccess: (data: AccessRequestPayload) =>
    axiosInstance.post<boolean>("/api/access/request", data),

  requestHistory: (doctorId: string) =>
    axiosInstance.get<MedicalHistoryRecord[]>(`/api/medical/history/${doctorId}`),

}


export default apiservice;
