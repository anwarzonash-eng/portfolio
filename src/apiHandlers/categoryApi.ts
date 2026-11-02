import { apigateway } from '@/gateways/apigateway';
import type { CategoryPicturePayload, CategoryPictureResponse } from '@/types/api';

export const categorySyncApi = async (payload: CategoryPicturePayload) => {
  return apigateway<CategoryPictureResponse>({
    endpoint: '/category/filteredListforPictureOfServices',
    method: 'POST',
    payload: payload,
  });
};
