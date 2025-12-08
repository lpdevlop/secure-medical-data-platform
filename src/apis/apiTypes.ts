

export interface LoginRequest {
  nic: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  role?: string;
  fullName?: string;

}

export interface UserProfile {
  email: string;
  lastName: string;
  role: string;
}

export interface UserProfilePayload {
  id: string;
}

export interface AccessRequestPayload{
      patientSecureId:string;
      reason:string;
      doctorId:string;

}

export interface AccessRequestResponse{
  patientId: string;
  recordType: string;

}