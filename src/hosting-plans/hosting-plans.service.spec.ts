import { Test, TestingModule } from '@nestjs/testing';
import { HostingPlansService } from './hosting-plans.service';

describe('HostingPlansService', () => {
  let service: HostingPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostingPlansService],
    }).compile();

    service = module.get<HostingPlansService>(HostingPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
