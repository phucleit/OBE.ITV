import { Test, TestingModule } from '@nestjs/testing';
import { DomainPlansService } from './domain-plans.service';

describe('DomainPlansService', () => {
  let service: DomainPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainPlansService],
    }).compile();

    service = module.get<DomainPlansService>(DomainPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
