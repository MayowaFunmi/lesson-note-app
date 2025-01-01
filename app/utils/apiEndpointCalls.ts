import { SignInData, SignupData, GenericResponse, LoginResponseData } from "../types/auth";
import { apiRequest } from "./application";

const signIn = async(formData: SignInData): Promise<LoginResponseData> => {
  try {
    const response = await apiRequest.post('/api/auth/login', formData);
    return response.data as LoginResponseData;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

const signUp = async(formData: SignupData): Promise<GenericResponse> => {
  const response = await apiRequest.post('/api/auth/create-user', formData)
  return response.data as GenericResponse;
}
const apiEndpointCalls = {
  signIn,
  signUp
}

export default apiEndpointCalls;