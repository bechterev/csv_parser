import { CreateInfoMovieDto } from './create-info-movie';

describe('InfoMovie', () => {
  it('should be defined', () => {
    expect(new CreateInfoMovieDto()).toBeDefined();
  });
});
