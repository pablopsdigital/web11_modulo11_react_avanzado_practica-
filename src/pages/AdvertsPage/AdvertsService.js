import ApiClient from '../../services/ApiClient';

export const getAdvertisements = () => {
  const url = `/api/v1/adverts`;
  return ApiClient.get(url);
};
