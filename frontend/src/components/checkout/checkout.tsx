import { useState } from "react";
import MainLogo from "../../../public/main-logo.png";
import Details from "../form/details";
import { ProfileData } from "../profile/profile";
import { useMediaQuery, useTheme } from "@mui/material";

export const Checkout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [activePage, setActivePage] = useState<number>(0);

  const onSubmit = async (formData: ProfileData) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setActivePage(3);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="font-montserrat flex flex-col justify-center items-center ">
      <div className="relative bg-[#0101ff] pb-28 w-full">
        <div className="w-full flex items-center justify-center py-12 lg:py-6 ">
          <a className="cursor-pointer" href="/">
            <img
              src={MainLogo}
              height={isMobile ? 600 : 300}
              width={isMobile ? 600 : 300}
            />
          </a>
        </div>
        <div
          className="absolute bottom-0 w-full overflow-hidden -mb-1 pointer-events-none"
          style={{ zIndex: 0 }} // Ensure it's behind everything
        >
          <svg
            viewBox="0 0 1440 200" // Reduced height to cut off extra space
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff" // Matches bg-blue-50
              d="M0,160 C480,200 960,80 1440,160 L1440,200 L0,200 Z" // Adjusted for less bottom space
            ></path>
          </svg>
        </div>
      </div>
      {/* Form Section */}
      <div className="lg:w-[50%]">
        <Details
          onSubmit={onSubmit}
          data={
            {
              emergencyContacts: [{ name: "", phone: "" }],
              insulinTypes: [{ type: "", dosage: "" }],
            } as ProfileData
          }
          activePage={activePage}
        />
      </div>
    </div>
  );
};
