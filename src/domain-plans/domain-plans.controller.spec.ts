import { Test, TestingModule } from '@nestjs/testing';
import { DomainPlansController } from './domain-plans.controller';
import { DomainPlansService } from './domain-plans.service';

describe('DomainPlansController', () => {
  let controller: DomainPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainPlansController],
      providers: [DomainPlansService],
    }).compile();

    controller = module.get<DomainPlansController>(DomainPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
