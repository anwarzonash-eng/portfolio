import { apigateway } from "@/gateways/apigateway";
import type { TinyUrlPayload, TinyUrlResponse } from "@/types/api";

export const getTargetURLFromTinyURL = async (payload: TinyUrlPayload) => {
  return apigateway<TinyUrlResponse>({
    endpoint: "/tiny_url/getTinyUrlDetail",
    method: "POST",
    payload: payload,
  });
};
