import { apigateway } from '@/gateways/apigateway';
import type { SkillsResponse } from '@/types/api';

export const skillsSyncApi = async () => {
  return apigateway<SkillsResponse>({
    endpoint: '/skills',
    method: 'GET',
  });
};
