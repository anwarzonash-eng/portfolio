import { apigateway } from '@/gateways/apigateway';

export const categorySyncApi = async (payload) => {
  return apigateway({
    endpoint: '/category/filteredListforPictureOfServices',
    method: 'POST',
    payload: payload,
  });
};
