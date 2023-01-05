import { Test, TestingModule } from '@nestjs/testing';
import { GooglesController } from './googles.controller';
import { GooglesService } from './googles.service';

describe('GooglesController', () => {
  let controller: GooglesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GooglesController],
      providers: [GooglesService],
    }).compile();

    controller = module.get<GooglesController>(GooglesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
