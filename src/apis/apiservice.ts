import { data } from 'react-router-dom';
import type { AccessRequestPayload, AccessRequestResponse, LoginRequest, MedicalHistoryRecord, PatientHistoryProps, PatientProfile, TokenResponse, UserProfile, UserProfilePayload } from './apiTypes';
import axiosInstance from './axiosInstance';
import type { CustomAxiosRequestConfig } from './axiosInstance';
import type { AxiosRequestConfig } from 'axios';


const apiservice ={
login: (data: LoginRequest) =>
  axiosInstance.post<TokenResponse>("/api/auth/login", data, {
    skipAuth: true,
  }),    
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

    requestMyRecords: (patientId: string) =>
  axiosInstance.get<MedicalHistoryRecord[]>(`/api/medical/record/${patientId}`),

    getPatientHistory: (patientId: string) =>
    axiosInstance.get(`/api/medical/historys/${patientId}`),

    grantAccess: (payload: { itemId:string,patientId: string; doctorId: number; expiresAt: string }) =>
    axiosInstance.post("/api/access/grant", payload),

revokeConsent: (payload: { itemId:string,patientId: string; doctorId: number }) =>
    axiosInstance.post("/api/access/revoke", payload),

getActiveConsents: () =>
  axiosInstance.get(`/api/access/active`), // make sure your backend returns data for current patient

}


export default apiservice;
