import { Test, TestingModule } from '@nestjs/testing';
import { HostingsController } from './hostings.controller';
import { HostingsService } from './hostings.service';

describe('HostingsController', () => {
  let controller: HostingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostingsController],
      providers: [HostingsService],
    }).compile();

    controller = module.get<HostingsController>(HostingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
