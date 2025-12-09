

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



export interface MedicalHistoryRecord {
  medicalId: string;
  patientId: string;
  createdAt: string;       
  accessExpires: string;    
  status: boolean;   
  name: string;
  type:string; 
  date:string      
}
export interface PatientHistoryProps {
  doctorId: string; 
}

export interface PatientRecord{
    medicalId: string;
  patientId: string;
  createdAt: string;       
  accessExpires: string;    
  status: boolean; 
}

export interface PatientProfile {
  patientSecureId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;

  accessGranted: boolean;
  accessExpiresAt: string;
}

export interface MedicalRecordResponse {
  patientId: string;
  name: string;
  medicalId: string;
  type: string;
  accessExpires: string;
}

