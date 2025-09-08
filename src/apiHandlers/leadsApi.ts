import { apigateway } from "@/gateways/apigateway";

export const addLeadsApi = async (payload) => {
  return apigateway({
    endpoint: "/leads/add",
    method: "POST",
    payload: payload,
    contentType: "multipart/form-data",
  });
};
