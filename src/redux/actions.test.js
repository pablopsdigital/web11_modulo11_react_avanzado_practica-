import { createFilters, uiResetError } from './actions';
import { ADVERTS_SET_FILTERS, UI_RESET_ERROR } from './constants';

describe('uiResetError', () => {
  test('should return an action with type UI_RESET_ERROR', () => {
    const expectedResult = { type: UI_RESET_ERROR };
    const resultTest = uiResetError();
    expect(resultTest).toEqual(expectedResult);
  });
});

// describe('createFilters', () => {
//   test('should return an action with type ADVERTS_SET_FILTERS', () => {
//     const filtersPayload = { filter1: 'filters' };
//     const expectedResult = { type: ADVERTS_SET_FILTERS, payload: filtersPayload };
//     expect(expectedResult).toEqual(createFilters(filtersPayload));
//   });
// });
