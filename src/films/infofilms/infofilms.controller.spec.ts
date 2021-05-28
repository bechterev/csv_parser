import { Test, TestingModule } from '@nestjs/testing';
import { InfofilmsController } from './infofilms.controller';

describe('InfofilmsController', () => {
  let controller: InfofilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfofilmsController],
    }).compile();

    controller = module.get<InfofilmsController>(InfofilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
