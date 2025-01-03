import axios from 'axios'
import { getSession } from 'next-auth/react';

const apiRequest = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json'
  }
})

apiRequest.interceptors.request.use(
  async function (config) {
    try {
      const session = await getSession();
      if (session && session?.user?.data) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${session?.user?.data}`;
        }
      }
    } catch (error) {
      console.error("Error in request interceptor:", error);
    }
    return config;
  },
  function (error) {
    // Handle errors from the request setup
    return Promise.reject(error);
  }
);

apiRequest.interceptors.response.use(
  (response) => {
      return response
  },
  (error) => {      
      return Promise.reject(error)
  },
)

export { apiRequest }