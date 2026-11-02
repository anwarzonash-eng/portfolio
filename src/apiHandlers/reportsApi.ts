import { apigateway } from '@/gateways/apigateway';
import type { ReportsPayload, ReportsResponse } from '@/types/api';

export const reportsSync = async (payload: ReportsPayload) => {
  return apigateway<ReportsResponse>({
    endpoint: '/detail-profiles/report',
    method: 'POST',
    payload: payload,
  });
};
