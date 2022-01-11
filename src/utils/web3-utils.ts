import { randomStringForEntropy } from '@stablelib/random';

export const isValidEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const isEmpty = (value: string) => {
  if (value === '') {
    return true;
  } else {
    return false;
  }
}

export const generateNonce = (): string => {
	return randomStringForEntropy(96);
}