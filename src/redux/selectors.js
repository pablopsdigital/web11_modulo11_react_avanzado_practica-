export const getIsLogged = (state) => state.auth;
export const getAdverts = (state) => state.adverts.data;

export const areAdvertsLoaded = (state) => state.adverts.loaded;

export const getUi = (state) => state.ui;

export const getAdvert = (state, advertId) => {
  console.log('advertid', advertId);
  state.adverts.data.find((advert) => advert.id === Number(advertId));
};
