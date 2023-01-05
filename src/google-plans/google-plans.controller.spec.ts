import { Test, TestingModule } from '@nestjs/testing';
import { GooglePlansController } from './google-plans.controller';
import { GooglePlansService } from './google-plans.service';

describe('GooglePlansController', () => {
  let controller: GooglePlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GooglePlansController],
      providers: [GooglePlansService],
    }).compile();

    controller = module.get<GooglePlansController>(GooglePlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
