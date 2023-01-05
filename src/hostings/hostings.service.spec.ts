import { Test, TestingModule } from '@nestjs/testing';
import { HostingsService } from './hostings.service';

describe('HostingsService', () => {
  let service: HostingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostingsService],
    }).compile();

    service = module.get<HostingsService>(HostingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
