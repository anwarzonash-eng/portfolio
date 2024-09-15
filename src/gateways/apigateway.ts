// import { logoutFunction } from '@/utils/logoutFunction';
import { swalPopupEnums } from '@/enums/app.enums';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
// import { redirect } from 'next/navigation';

export const apigateway = async ({
  endpoint,
  method,
  payload = null,
  isDisplayResponsePopUp = false,
  successMessage = null,
  successCallback = null,
  successPlainText = null,
  contentType = null,
  errorCallback = null,
}) => {
  // const token = localStorage.getItem('token');
  const config = {
    method: method,
    url: `${process.env.API_BASE_URL}${endpoint}`,
    headers: {
      'Content-Type': contentType ? contentType : 'application/json',
      // ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(payload && { data: payload }),
  };

  try {
    const response = await axios(config);

    if (isDisplayResponsePopUp) {
      await Swal.fire({
        icon: swalPopupEnums.icon.SUCCESS as SweetAlertIcon,
        title: successMessage || `Action performed successfully.`,
        text: successPlainText,
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          if (successCallback && typeof successCallback === 'function') {
            successCallback();
          }
        }
      });
    }
    return response;
  } catch (error) {
    // if (error.response?.data?.message === 'UnauthorizedException') {
    //   await logoutFunction('/?error=login');
    //   return;
    // }

    const errorMessage = error?.response?.data?.data?.results?.error;

    isDisplayResponsePopUp &&
      (await Swal.fire({
        icon: swalPopupEnums.icon.ERROR as SweetAlertIcon,
        title: errorMessage || `There's an unknown error. Try again later.`,
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          if (errorCallback && typeof errorCallback === 'function') {
            errorCallback();
          }
        }
      }));
    return error.response;
  }
};
