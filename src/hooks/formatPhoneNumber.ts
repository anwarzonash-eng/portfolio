export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return phoneNumber;

  // Normalize multiple leading plus signs to a single plus
  phoneNumber = phoneNumber.replace(/^\++/, "+");

  // Remove any internal spaces so slicing works reliably
  const normalized = phoneNumber.replace(/\s+/g, "");

  let finalNumber = normalized;

  if (finalNumber.startsWith('+92')) {
    // already in desired international format for PK
  } else if (finalNumber.startsWith('92')) {
    finalNumber = '+' + finalNumber;
  } else if (finalNumber.startsWith('0')) {
    finalNumber = '+92' + finalNumber.substr(1);
  } else if (!finalNumber.startsWith('+')) {
    finalNumber = '+' + finalNumber;
  }

  const firstPart = finalNumber?.substr(0, 3);
  const secondPart = finalNumber?.substr(3, 3);
  const thirdPart = finalNumber?.substr(6);

  return `${firstPart} ${secondPart} ${thirdPart}`;
};
