import { apigateway } from '@/gateways/apigateway';

export const reportsSync = async (payload) => {
  return apigateway({
    endpoint: '/detail-profiles/report',
    method: 'POST',
    payload: payload,
  });
};
