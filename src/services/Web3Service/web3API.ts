import { Backend } from "../../interface/web3-data-interface";

export async function fetchNonce(backend: Backend) {
    return new Promise<{ nonce: string }>((resolve, reject) => {
      fetch(backend.endpoint, backend.requestOptions)
      .then(async (response) => {
        if (response.status !== 200) {
            resolve({ nonce: ''})
        } else {
            resolve({ nonce: await response.text()})
        }
      })
      .catch((err) => {
        console.error(err);
        resolve({nonce: ''});
      });
    });
}