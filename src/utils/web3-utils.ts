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

// export const API_PREFIX = 'https://api.secureauth3.com/api/v1';
export const API_PREFIX = 'http://localhost:8080/api/v1';
