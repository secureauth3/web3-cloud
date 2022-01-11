import 'regenerator-runtime/runtime'
import { VerificationService } from './VerificationService';

describe('VerificationService', () => {
  let service: VerificationService;

  beforeEach(() => {
    service = new VerificationService();
  });

  it('should create VerificationService', () => {
    expect(service).toBeTruthy();
  });
});