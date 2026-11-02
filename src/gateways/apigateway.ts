import { swalPopupEnums } from "@/enums/app.enums";
import axios, { AxiosError, AxiosResponse, Method } from "axios";
import Swal, { SweetAlertIcon } from "sweetalert2";

export interface ApiGatewayOptions {
  endpoint: string;
  method: Method;
  payload?: unknown;
  isDisplayResponsePopUp?: boolean;
  successMessage?: string | null;
  successCallback?: (() => void) | null;
  successPlainText?: string | null;
  contentType?: string | null;
  errorCallback?: (() => void) | null;
}

/**
 * Thin Axios wrapper used by every API handler. `T` is the response body
 * (usually an ApiEnvelope<...> from src/types/api.ts). On HTTP errors the
 * failed response is returned instead of thrown, so callers must check
 * `status`; it is `undefined` when the request never reached the server.
 */
export const apigateway = async <T = unknown>({
  endpoint,
  method,
  payload = null,
  isDisplayResponsePopUp = false,
  successMessage = null,
  successCallback = null,
  successPlainText = null,
  contentType = null,
  errorCallback = null,
}: ApiGatewayOptions): Promise<AxiosResponse<T> | undefined> => {
  const config = {
    method: method,
    url: `${process.env.API_BASE_URL}${endpoint}`,
    headers: {
      "Content-Type": contentType ? contentType : "application/json",
      // ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(payload ? { data: payload } : {}),
  };
  try {
    const response = await axios<T>(config);

    if (isDisplayResponsePopUp) {
      await Swal.fire({
        icon: swalPopupEnums.icon.SUCCESS as SweetAlertIcon,
        title: successMessage || `Action performed successfully.`,
        text: successPlainText ?? undefined,
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          if (successCallback && typeof successCallback === "function") {
            successCallback();
          }
        }
      });
    }
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{
      data?: { results?: { error?: string } };
    }>;
    const errorMessage = axiosError?.response?.data?.data?.results?.error;

    if (isDisplayResponsePopUp) {
      await Swal.fire({
        icon: swalPopupEnums.icon.ERROR as SweetAlertIcon,
        title: errorMessage || `There's an unknown error. Try again later.`,
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          if (errorCallback && typeof errorCallback === "function") {
            errorCallback();
          }
        }
      });
    }
    return axiosError.response as AxiosResponse<T> | undefined;
  }
};
