import { apigateway } from '@/gateways/apigateway';

export const addLeadsApi = async (payload, successCallbackFunction) => {
  return apigateway({
    endpoint: '/leads/add',
    method: 'POST',
    payload: payload,
    contentType: 'multipart/form-data',
    isDisplayResponsePopUp: true,
    successMessage: 'Thankyou For Contacting! ',
    successPlainText: 'We will get back to you soon.',
    successCallback: successCallbackFunction,
  });
};
