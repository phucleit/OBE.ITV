import { Test, TestingModule } from '@nestjs/testing';
import { FacebookPlansService } from './facebook-plans.service';

describe('FacebookPlansService', () => {
  let service: FacebookPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacebookPlansService],
    }).compile();

    service = module.get<FacebookPlansService>(FacebookPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
