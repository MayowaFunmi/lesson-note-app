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
  data: {
    status?: string
    message: string
    data?: object | string | null
  }
}

 export interface LoginResponseData {
  data: {
    status?: string;
    message: string;
    data: string;
    user: UserResponseData
  };
 }

 export interface Session {
  user: {
    email: string
    id: string
    username: string
    emailVerified: boolean
    phoneNumber: string
    password: string
    dateJoined: string
    updatedAt: string
    data: string // token
    iat: number
    exp: number
    jti: string
  }
 }
