import { useEffect, useState } from "react";
import MainLogo from "../../../public/main-logo.png";
import Details from "../form/details";
import { ProfileData } from "../profile/profile";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Checkout: React.FC = () => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || undefined; // Load from storage if available
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const isLive = false;

  const onSubmit = async (formData: ProfileData) => {
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.userId) {
        setUserId(data.userId);
        setActivePage(3);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. If the error persists, please contact us."
      );
    }
  };
  return isLive ? (
    <div className="flex m-auto text-4xl font-montserrat">Coming soon...</div>
  ) : (
    <div className="font-montserrat mb-8">
      <div className="relative bg-[#0101ff] md:pb-40 pb-14">
        <div className="flex items-center justify-center py-4 md:py-6 ">
          <img
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
          onSubmit={onSubmit}
          data={
            {
              emergencyContacts: [{ name: "", phone: "" }],
              insulinTypes: [{ type: "", dosage: "" }],
            } as ProfileData
          }
          userId={userId}
          activePage={activePage}
        />
      </div>
    </div>
  );
};
