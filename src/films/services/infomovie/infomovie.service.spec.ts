import { Test, TestingModule } from '@nestjs/testing';
import { InfomovieService } from './infomovie.service';

describe('InfomovieService', () => {
  let service: InfomovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfomovieService],
    }).compile();

    service = module.get<InfomovieService>(InfomovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
