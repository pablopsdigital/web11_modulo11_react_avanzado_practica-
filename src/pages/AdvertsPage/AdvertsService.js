import ApiClient from '../../services/ApiClient';

export const getAdvertisements = () => {
  const url = `/api/v1/adverts`;
  return ApiClient.get(url);
};

export const getAllTags = () => {
  const url = `/api/v1/adverts/tags`;
  return ApiClient.get(url);
};
