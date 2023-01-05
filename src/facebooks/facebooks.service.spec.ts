import { Test, TestingModule } from '@nestjs/testing';
import { FacebooksService } from './facebooks.service';

describe('FacebooksService', () => {
  let service: FacebooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacebooksService],
    }).compile();

    service = module.get<FacebooksService>(FacebooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
