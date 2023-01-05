import { Test, TestingModule } from '@nestjs/testing';
import { SslsController } from './ssls.controller';
import { SslsService } from './ssls.service';

describe('SslsController', () => {
  let controller: SslsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SslsController],
      providers: [SslsService],
    }).compile();

    controller = module.get<SslsController>(SslsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
