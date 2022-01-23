import ApiClient from '../../services/ApiClient';

export const getAdvertisementId = (advertisementId) => {
  const url = `/api/v1/adverts/${advertisementId}`;
  return ApiClient.get(url);
};

export const deleteAdvertisementId = (advertisementId) => {
  const url = `/api/v1/adverts/${advertisementId}`;
  return ApiClient.delete(url);
};
