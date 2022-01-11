import 'regenerator-runtime/runtime'
import CryptographyService from './CryptographyService';

describe('Cryptography', () => {
  let service: CryptographyService;

  beforeEach(() => {
    service = new CryptographyService();
  });

  it('should create CryptographyService', () => {
    expect(service).toBeTruthy();
  });
});