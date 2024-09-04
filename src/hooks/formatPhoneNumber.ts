export const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber?.startsWith('+92')) {
    return phoneNumber;
  } else if (phoneNumber?.startsWith('92')) {
    phoneNumber = '+' + phoneNumber;
  } else if (phoneNumber?.startsWith('0')) {
    phoneNumber = '+92' + phoneNumber.substr(1);
  } else {
    phoneNumber = '+' + phoneNumber;
  }

  const firstPart = phoneNumber?.substr(0, 3);
  const secondPart = phoneNumber?.substr(3, 3);
  const thirdPart = phoneNumber?.substr(6);

  return `${firstPart} ${secondPart} ${thirdPart}`;
};
