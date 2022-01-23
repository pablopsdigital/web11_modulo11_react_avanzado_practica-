export const getAdverts = (state) =>
  state.adverts.data.sort((t1, t2) => t2.updatedAt.localeCompare(t1.updatedAt));

export const areAdvertsLoaded = (state) => state.adverts.loaded;

export const getAdvert = (state, advertId) =>
  state.adverts.data.find((advert) => advert.id === Number(advertId));
