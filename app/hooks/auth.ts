import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupData } from "../types/auth";
import apiEndpointCalls from "../utils/apiEndpointCalls";

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: SignupData) => apiEndpointCalls.signUp(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "users" });
    }
  })
}