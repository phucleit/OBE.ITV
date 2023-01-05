import { Test, TestingModule } from '@nestjs/testing';
import { SslPlansController } from './ssl-plans.controller';
import { SslPlansService } from './ssl-plans.service';

describe('SslPlansController', () => {
  let controller: SslPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SslPlansController],
      providers: [SslPlansService],
    }).compile();

    controller = module.get<SslPlansController>(SslPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
