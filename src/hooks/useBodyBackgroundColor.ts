
import { useEffect } from 'react';

const useBodyBackgroundColor = (color: string) => {
  useEffect(() => {
    document.body.style.backgroundColor = color;

    // Cleanup: Reset to default color when component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [color]);
};

export default useBodyBackgroundColor;
