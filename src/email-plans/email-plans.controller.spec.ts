import { Test, TestingModule } from '@nestjs/testing';
import { EmailPlansController } from './email-plans.controller';
import { EmailPlansService } from './email-plans.service';

describe('EmailPlansController', () => {
  let controller: EmailPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailPlansController],
      providers: [EmailPlansService],
    }).compile();

    controller = module.get<EmailPlansController>(EmailPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
