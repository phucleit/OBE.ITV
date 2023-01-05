import { Test, TestingModule } from '@nestjs/testing';
import { FacebookPlansController } from './facebook-plans.controller';
import { FacebookPlansService } from './facebook-plans.service';

describe('FacebookPlansController', () => {
  let controller: FacebookPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacebookPlansController],
      providers: [FacebookPlansService],
    }).compile();

    controller = module.get<FacebookPlansController>(FacebookPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
