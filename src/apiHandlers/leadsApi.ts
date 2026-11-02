import { apigateway } from "@/gateways/apigateway";
import type { AddLeadPayload, ApiEnvelope } from "@/types/api";

export const addLeadsApi = async (payload: AddLeadPayload) => {
  return apigateway<ApiEnvelope<unknown>>({
    endpoint: "/leads/manual-add",
    method: "POST",
    payload: { jobBody: payload },
    contentType: "application/json",
  });
};
