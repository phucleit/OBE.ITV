import { Test, TestingModule } from '@nestjs/testing';
import { MaintenancePlansService } from './maintenance-plans.service';

describe('MaintenancePlansService', () => {
  let service: MaintenancePlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenancePlansService],
    }).compile();

    service = module.get<MaintenancePlansService>(MaintenancePlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
