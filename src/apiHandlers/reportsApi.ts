import { apigateway } from '@/gateways/apigateway';

export const reportsSync = async (payload) => {
  return apigateway({
    endpoint: '/reports',
    method: 'POST',
    payload: payload,
  });
};
