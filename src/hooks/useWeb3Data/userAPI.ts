import { AuthData } from "../../interface/auth-provider-interface";
import { API_PREFIX } from "../../utils/routes.contant";

export async function postUser(
  account: string,
  email: string,
  firstName: string,
  lastName: string,
  ens: string,
  chainId: number,
  apiKey: string
  ) {
  const requestOptionsCreate = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
      },
    body: JSON.stringify(
      { 
        account: account,
        email: email,
        firstName: firstName,
        lastName: lastName,
        ens: ens,
        chainId: chainId
      }
    )
  };

  return new Promise<{ data: any }>((resolve, reject) => {
    fetch(`${API_PREFIX}/api/v1/users`, requestOptionsCreate)
    .then(response => response.json())
    .then(data => {
      resolve({ data: data })
    })
    .catch(() => {
      reject({data: null});
    });
  });
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








