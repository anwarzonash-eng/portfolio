export const openChat = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  const tawk = window.Tawk_API as { maximize?: () => void } | undefined;
  if (tawk?.maximize) {
    tawk.maximize();
  }
};
