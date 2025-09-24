import { useEffect, useState } from "react";

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Function to update state
    const update = () => setIsDesktop(window.innerWidth >= breakpoint);
    update(); // run once on mount
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isDesktop;
}

export default useIsDesktop;
