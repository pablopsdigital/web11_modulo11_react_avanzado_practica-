import ApiClient from '../../services/ApiClient';

export const getAllTags = () => {
  const url = `/api/v1/adverts/tags`;
  return ApiClient.get(url);
};
