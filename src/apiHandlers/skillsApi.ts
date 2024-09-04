import { apigateway } from '@/gateways/apigateway';

export let skillsPayload = {
  id: '',
  title: 'Wordpress',
  url: '',
  catagory: '',
  description: '',
  order: '',
  skillsIds:
    '{"skills_ids": ["9a78d633-53a0-4a70-9770-2adf8d5305e1","9a78d633-53a0-4a70-9770-2adf8d5305e1"]}',
  actionType: 'list',
  companytype: '',
};

export const skillsSync = async () => {
  return apigateway({
    endpoint: '/skill/sync',
    method: 'POST',
    payload: skillsPayload,
  });
};
