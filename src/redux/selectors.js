export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) => state.adverts.data;

export const getAdvertsTags = (state) => state.adverts.tags;

export const getAdvertsTagsIsLoaded = (state) => getAdvertsTags(state).length > 0;

export const getAdvert = (state, advertId) => {
  return state.adverts.data.find((advert) => advert.id === advertId);
};

export const areAdvertsLoaded = (state) => state.adverts.loaded;

export const getFilters = (state) => state.filters;

export const getUi = (state) => state.ui;
