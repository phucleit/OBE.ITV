import { Test, TestingModule } from '@nestjs/testing';
import { HostingPlansController } from './hosting-plans.controller';
import { HostingPlansService } from './hosting-plans.service';

describe('HostingPlansController', () => {
  let controller: HostingPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostingPlansController],
      providers: [HostingPlansService],
    }).compile();

    controller = module.get<HostingPlansController>(HostingPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
