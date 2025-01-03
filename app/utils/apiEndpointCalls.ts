import {
  SignInData,
  SignupData,
  GenericResponse,
  LoginResponseData,
} from "../types/auth";
import { apiRequest } from "./application";

const signIn = async (formData: SignInData): Promise<LoginResponseData> => {
  try {
    const response = await apiRequest.post("/api/auth/login", formData);
    return response.data as LoginResponseData;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

const signUp = async (formData: SignupData): Promise<GenericResponse> => {
  const response = await apiRequest.post("/api/auth/create-user", formData);
  console.log(`response: ${response.data}`);
  return response.data as GenericResponse;
};

const getRoles = async() => {
  const response = await apiRequest.get("/api/roles/all-roles");
  console.log(`response: ${response.data}`);
  return response.data;
}

const apiEndpointCalls = {
  signIn,
  signUp,
  getRoles
};

export default apiEndpointCalls;
