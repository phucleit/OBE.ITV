import { Test, TestingModule } from '@nestjs/testing';
import { GooglePlansService } from './google-plans.service';

describe('GooglePlansService', () => {
  let service: GooglePlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GooglePlansService],
    }).compile();

    service = module.get<GooglePlansService>(GooglePlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
