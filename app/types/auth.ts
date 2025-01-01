export interface SignInData {
  username: string
  password: string
}

export interface SignupData {
  username: string
  email: string
  phoneNumber: string
  password: string
}
export interface UserResponseData {
  id: string
  username: string
  email: string
  phoneNumber: string
  password: string
  dateJoined: string
}

export interface GenericResponse {
  status: string
  message: string
  data: UserResponseData
}

 export interface LoginResponseData {
  status: string
  message: string
  token: string
  user: UserResponseData
 }