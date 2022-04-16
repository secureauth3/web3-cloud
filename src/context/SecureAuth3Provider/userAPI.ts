import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AuthData, NewAuth3User } from "./SecureAuth3Provider";

const API_PREFIX = 'http://localhost:8080/api/v1';

export interface PostUserReponse {
  id: string
}

export interface VerifyUserReponse {
  accessToken: string
}

export interface FetchUserReponse {
  account: string;
  email: string;
  dappName: string;
  firstName: string;
  lastName: string;
  ens: string;
  chainId: number;
  permissionType: string;
  permissionFlags: number;
  lastLogin: number;
}

export interface ErrorResponse {
  error: string;
}

export interface ErrorMultipleBody {
  value: any;
  msg: string;
  parmam: string;
  location: string;
}

export interface ErrorResponseMultiple {
  errors: ErrorMultipleBody [];
}

export async function postUser(newUser: NewAuth3User, apiKey: string): Promise<PostUserReponse | ErrorResponse | ErrorResponseMultiple> {
  try {
    const payload = {
      account: newUser.account,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      ens: newUser.ens,
      permissionFlag: newUser.permissionFlag,
      chainId: newUser.chainId
    };

    const config: AxiosRequestConfig = {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      withCredentials: false
    }

    const res: AxiosResponse = await axios.post(`${API_PREFIX}/users`, payload, config);
    return res.data;
  } catch (err: any) {
    if ('err.response.data' in err) {
      return (err).response.data ;
    } else {
      return {error: 'Could not to connect to Secure Auth API. Please check internet connection and try again.'}
    }
  }
}

export async function verify(web3Values: AuthData, apiKey: string): Promise<VerifyUserReponse | ErrorResponse | ErrorResponseMultiple> {
  try {
    const payload = {
      address: web3Values.address,
      signature: web3Values.signature,
      message: web3Values.message,
      email: web3Values.email,
    };

    const config: AxiosRequestConfig = {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      withCredentials: true
    }

    const res: AxiosResponse = await axios.post(`${API_PREFIX}/auth/verify`, payload, config);
    return res.data;
  } catch (err: any) {
    console.log('catch error: ', err);
    console.log('catch error response: ', err.response.data);
    console.log('catch error response check: ','err.response.data' in err);

    if ('err.response.data' in err) {
      return err.response.data;
    } else {
      return {error: 'Could not to connect to Secure Auth API. Please check internet connection and try again.'}
    }
  }
}

export async function signOut(apiKey: string) {
  const requestOptionsGetUser: any = {
    method: 'GET',
    credentials: 'include', // Don't forget to specify this if you need cookies
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
      },
  };

  return new Promise<{ data: any }>((resolve, reject) => {
    fetch(`${API_PREFIX}/api/v1/auth/sign-out`, requestOptionsGetUser)
    .then(response => response.json())
    .then(data => {
      resolve({ data: data })
    })
    .catch(() => {
      reject({data: null});
    });
  });
}

export async function refreshToken(apiKey: string) {
  const requestOptionsGetUser: any = {
    method: 'GET',
    credentials: 'include', // Don't forget to specify this if you need cookies
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
      },
  };

  return new Promise<{ data: any }>((resolve, reject) => {
    fetch(`${API_PREFIX}/auth/refresh-token`, requestOptionsGetUser)
    .then(response => response.json())
    .then(data => {
      resolve({ data: data })
    })
    .catch(() => {
      reject({data: null});
    })
  });
}

export async function fetchUser(account: string, accessToken: string, apiKey: string): Promise<FetchUserReponse | ErrorResponse> {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${accessToken} ${apiKey}`,
      },
      withCredentials: false
    }

    const res: AxiosResponse = await axios.get(`${API_PREFIX}/users/${account}`, config);
    return res.data;
  } catch (err: any) {
    if ('err.response.data' in err) {
      return err.response.data;
    } else {
      return {error: 'Could not to connect to Secure Auth API. Please check internet connection and try again.'}
    }
  }
}








