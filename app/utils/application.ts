import axios from 'axios'

const apiRequest = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json'
  }
})

// apiClient.interceptors.request.use(async function (config) {
//   try {
//       const session = await getSession()
      
//       if (session && session?.user && session?.user?.accessToken?.value) {
//           config.headers.Authorization = `Bearer ${session?.user?.accessToken?.value}`;
//       }
      
//   } catch (error) {
//       throw new Error(error?.response?.data?.message)
//   }
//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => {
//       Nprogress.done()
//       return response
//   },
//   (error) => {
//       Nprogress.done()
      
//       return Promise.reject(error)
//   },
// )

export { apiRequest }