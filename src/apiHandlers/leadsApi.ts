import { apigateway } from "@/gateways/apigateway";

export const addLeadsApi = async (payload: any) => {
  return apigateway({
    endpoint: "/leads/manual-add",
    method: "POST",
    payload: { jobBody: payload },
    contentType: "application/json",
  });
};
