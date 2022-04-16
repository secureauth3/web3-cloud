import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_PREFIX = 'http://localhost:8080/api/v1';

export interface NonceReponse {
  nonce: string
}

export async function fetchAuth3Nonce(): Promise<NonceReponse> {
  try {
    const config: AxiosRequestConfig = {
      withCredentials: true
    }
    const res: AxiosResponse = await axios.get(`${API_PREFIX}/auth/nonce`, config);
    return {nonce: await res.data};
  } catch (err: any) {
      return {nonce: ''}
  }
}