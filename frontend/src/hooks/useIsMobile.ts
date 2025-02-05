import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";

export function useIsMobile() {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(theme.breakpoints.down("lg"));
    setIsMobile(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handler);

    console.log("isMob", isMobile);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  return !isMobile;
}
