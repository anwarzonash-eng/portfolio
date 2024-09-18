import { useEffect } from 'react';

const Tawkto = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isUValue = localStorage.getItem('u');
      if (isUValue !== 'true') {
        var s1 = document.createElement('script'),
          s0 = document.getElementsByTagName('script')[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/66defa8350c10f7a00a63f1e/1i7bg5521';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      }
    }
  }, []);
  return null;
};

export default Tawkto;
