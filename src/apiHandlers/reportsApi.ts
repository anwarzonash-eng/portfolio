import { apigateway } from '@/gateways/apigateway';

export let reportsPayload = {
  domain: 'localhost:5002',
  uniqueId: 'a',
  actionType: 'home',
  itemID: '',
};

export const reports = async () => {
  return apigateway({
    endpoint: '/reports',
    method: 'POST',
    payload: reportsPayload,
  });
};
