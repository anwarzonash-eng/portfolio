import { apigateway } from '@/gateways/apigateway';

export let reportsPayload = {
  domain: '',
  uniqueId: '',
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
