import { data } from 'react-router-dom';
import type { AccessRequestPayload, AccessRequestResponse, LoginRequest, MedicalHistoryRecord, PatientHistoryProps, PatientProfile, TokenResponse, UserProfile, UserProfilePayload } from './apiTypes';
import axiosInstance from './axiosInstance';
import type { CustomAxiosRequestConfig } from './axiosInstance';
import type { AxiosRequestConfig } from 'axios';


const apiservice ={
    login: (data: LoginRequest) =>
    axiosInstance.post<TokenResponse>("/api/auth/login", data),
    getUserProfile: (data: UserProfilePayload) =>
     axiosInstance.post<{ userprofile: UserProfile }>(`/user`,data),

    requestAccess: (data: AccessRequestPayload) =>
    axiosInstance.post<boolean>("/api/access/request", data),

  requestHistory: (doctorId: string) =>
    axiosInstance.get<MedicalHistoryRecord[]>(`/api/medical/history/${doctorId}`),

    requestRecord: (doctorId: string) =>
    axiosInstance.get<MedicalHistoryRecord[]>(`/api/medical/records/${doctorId}`),

    getGrantedProfiles: (doctorId: string) =>
    axiosInstance.get<PatientProfile[]>(`/api/doctor/patient/profile/${doctorId}`),

}


export default apiservice;
