import { useState } from "react";
import MainLogo from "../../../public/main-logo.png";
import Details from "../form/details";
import { ProfileData } from "../profile/profile";
import { useIsMobile } from "../../hooks/useIsMobile";
export const Checkout: React.FC = () => {
  const isMobile = useIsMobile();
  const [error] = useState<string | null>(null);
  const isLive = false;

  return isLive ? (
    <div className="flex m-auto text-4xl">Coming soon...</div>
  ) : (
    <div className="mb-8">
      <div className="relative bg-[#0101ff] md:pb-40 pb-14">
        <div className="flex items-center justify-center py-4 md:py-6 ">
          <img
            alt="Main Logo"
            src={MainLogo}
            height={isMobile ? 250 : 300}
            width={isMobile ? 250 : 300}
          />
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

      {/* Error Message Display */}
      {error && (
        <div className=" text-red-500 text-center py-2 px-4 mb-4 rounded-md mx-auto w-[50%]">
          {error}
        </div>
      )}
      {/* Form Section */}
      <div className="md:w-[50%] flex mx-auto">
        <Details
          data={
            {
              emergencyContacts: [{ name: "", phone: "" }],
              insulinTypes: [{ type: "", dosage: "" }],
            } as ProfileData
          }
        />
      </div>
    </div>
  );
};
