import { Test, TestingModule } from '@nestjs/testing';
import { FacebooksController } from './facebooks.controller';
import { FacebooksService } from './facebooks.service';

describe('FacebooksController', () => {
  let controller: FacebooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacebooksController],
      providers: [FacebooksService],
    }).compile();

    controller = module.get<FacebooksController>(FacebooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
