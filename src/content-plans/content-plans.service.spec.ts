import { Test, TestingModule } from '@nestjs/testing';
import { ContentPlansService } from './content-plans.service';

describe('ContentPlansService', () => {
  let service: ContentPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentPlansService],
    }).compile();

    service = module.get<ContentPlansService>(ContentPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
