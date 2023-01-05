import { Test, TestingModule } from '@nestjs/testing';
import { GooglesService } from './googles.service';

describe('GooglesService', () => {
  let service: GooglesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GooglesService],
    }).compile();

    service = module.get<GooglesService>(GooglesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
