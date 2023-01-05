import { Test, TestingModule } from '@nestjs/testing';
import { EmailPlansService } from './email-plans.service';

describe('EmailPlansService', () => {
  let service: EmailPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailPlansService],
    }).compile();

    service = module.get<EmailPlansService>(EmailPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
