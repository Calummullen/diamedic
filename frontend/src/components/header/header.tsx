import MainLogo from "../../../public/main-logo.png";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Header = () => {
  const isMobile = useIsMobile();
  return (
    <div className="relative bg-[#0101ff] md:pb-40 pb-14">
      <div className="flex items-center justify-center py-4 md:py-6 ">
        <a href="/">
          <img
            alt="Main Logo"
            src={MainLogo}
            height={isMobile ? 250 : 300}
            width={isMobile ? 250 : 300}
          ></img>
        </a>
      </div>
      {/* Wavy Line */}
      <div
        className="absolute bottom-0 w-full overflow-hidden -mb-1 pointer-events-none"
        style={{ zIndex: 0 }} // Ensure it's behind everything
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff" // Matches bg-blue-50
            d="M0,240 C480,300 960,168 1440,240 L1440,320 L0,320 Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
