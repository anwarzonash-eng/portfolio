import { apigateway } from '@/gateways/apigateway';

export const skillsSyncApi = async (payload) => {
  return apigateway({
    endpoint: '/skill/sync',
    method: 'POST',
    payload: payload,
  });
};
