import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthData, NewUser } from "./SecureAuth3Provider";

const API_PREFIX = 'http://localhost:8080';

export interface PostUserReponse {
  id: string
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


export async function postUser(newUser: NewUser, apiKey: string): Promise<PostUserReponse | ErrorResponse | ErrorResponseMultiple> {
  try {
    const payload = {
      account: newUser.account,
      email: newUser.email,
      firstName: newUser.email,
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

    const res = await axios.post(`${API_PREFIX}/api/v1/owners`, payload, config);
    return res.data;
  } catch (err) {
    return {error: 'Error creating user.'}
  }
}

export async function verify(web3Values: AuthData, apiKey: string) {
  const requestOptionsAuth: any = {
    method: 'POST',
    credentials: 'include', // Don't forget to specify this if you need cookies
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
      },
    body: JSON.stringify(web3Values)
  };

  return new Promise<{ data: any }>((resolve, reject) => {
    fetch(`${API_PREFIX}/api/v1/auth/verify`, requestOptionsAuth)
    .then(response =>  response.json())
    .then(data => {
      resolve({ data: data})
    })
    .catch(() => {
      reject({data: null});
    });
  });
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
    fetch(`${API_PREFIX}/api/v1/auth/refresh-token`, requestOptionsGetUser)
    .then(response => response.json())
    .then(data => {
      resolve({ data: data })
    })
    .catch(() => {
      reject({data: null});
    })
  });
}

export async function fetchUser(account: string, accessToken: string, apiKey: string) {
  const requestOptionsGetUser: any = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken} ${apiKey}`
      },
  };

  return new Promise<{ data: any }>((resolve, reject) => {
    fetch(`${API_PREFIX}/api/v1/users/${account}`, requestOptionsGetUser)
    .then(response => response.json())
    .then(data => {
      resolve({ data: data })
    })
    .catch(() => {
      reject({data: null});
    });
  });
}








