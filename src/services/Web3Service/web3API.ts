import axios, { AxiosResponse } from 'axios';
import { API_PREFIX } from '../../utils/web3-utils';

export interface NonceReponse {
  nonce: string;
  token: string;
}

export async function fetchAuth3Nonce(): Promise<NonceReponse> {
  try {
    const res: AxiosResponse = await axios.get(`${API_PREFIX}/auth/nonce`);
    return res.data;
  } catch (err: any) {
      return {nonce: '', token: ''}
  }
}