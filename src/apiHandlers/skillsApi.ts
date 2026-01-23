import { apigateway } from '@/gateways/apigateway';

export const skillsSyncApi = async (payload) => {
  return apigateway({
    endpoint: '/skills',
    method: 'GET',
    // payload: payload,
  });
};
