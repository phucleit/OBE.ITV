import { Test, TestingModule } from '@nestjs/testing';
import { SslPlansService } from './ssl-plans.service';

describe('SslPlansService', () => {
  let service: SslPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SslPlansService],
    }).compile();

    service = module.get<SslPlansService>(SslPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
