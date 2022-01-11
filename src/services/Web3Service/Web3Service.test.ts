import 'regenerator-runtime/runtime'
import { Web3Service } from './Web3Service';

describe('Web3Service', () => {
  let service: Web3Service;

  beforeEach(() => {
    service = new Web3Service();
  });

  it('should create Web3Service', () => {
    expect(service).toBeTruthy();
  });
});