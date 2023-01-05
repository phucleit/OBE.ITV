import { Test, TestingModule } from '@nestjs/testing';
import { SslsService } from './ssls.service';

describe('SslsService', () => {
  let service: SslsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SslsService],
    }).compile();

    service = module.get<SslsService>(SslsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
