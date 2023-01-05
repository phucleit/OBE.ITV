import { Test, TestingModule } from '@nestjs/testing';
import { ContentPlansController } from './content-plans.controller';
import { ContentPlansService } from './content-plans.service';

describe('ContentPlansController', () => {
  let controller: ContentPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentPlansController],
      providers: [ContentPlansService],
    }).compile();

    controller = module.get<ContentPlansController>(ContentPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
