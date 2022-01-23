export const getIsLogged = (state) => state.auth;
export const getAdverts = (state) => state.adverts.data;

export const areAdvertsLoaded = (state) => state.adverts.loaded;

export const getUi = (state) => state.ui;

export const getAdvert = (state, advertId) => {
  return state.adverts.data.find((advert) => advert.id === advertId);
};
