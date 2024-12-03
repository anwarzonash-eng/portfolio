import { apigateway } from '@/gateways/apigateway';

export const getTargetURLFromTinyURL = async (payload) => {
  return apigateway({
    endpoint: '/tiny_url/getTinyUrlDetail',
    method: 'POST',
    payload: payload,
  });
};
