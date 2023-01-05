import { Test, TestingModule } from '@nestjs/testing';
import { MaintenancePlansController } from './maintenance-plans.controller';
import { MaintenancePlansService } from './maintenance-plans.service';

describe('MaintenancePlansController', () => {
  let controller: MaintenancePlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenancePlansController],
      providers: [MaintenancePlansService],
    }).compile();

    controller = module.get<MaintenancePlansController>(MaintenancePlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
