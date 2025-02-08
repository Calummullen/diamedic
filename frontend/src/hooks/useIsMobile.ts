import { useTheme, useMediaQuery } from "@mui/material";

export function useIsMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Directly use MUI hook

  return isMobile; // Return correctly without inverting the value
}
