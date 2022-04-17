import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_PREFIX } from '../../utils/web3-utils';

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