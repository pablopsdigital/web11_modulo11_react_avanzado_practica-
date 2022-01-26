import { getAdvert } from './selectors';

describe('getAdvert', () => {
  test('should return a davert', () => {
    const adverts = [{ id: 1 }, { id: 2 }];
    const advertId = 1;
    const state = {
      adverts: {
        loaded: false,
        data: adverts,
        tags: []
      }
    };

    expect(getAdvert(state, advertId)).toEqual(adverts[0]);
  });

  test('should return null', () => {
    const adverts = [{ id: 1 }, { id: 2 }];
    const advertId = 5;

    const state = {
      adverts: {
        loaded: false,
        data: adverts,
        tags: []
      }
    };
    expect(getAdvert(state, advertId)).not.toBeDefined();
  });
});
