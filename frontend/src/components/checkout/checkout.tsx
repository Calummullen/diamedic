import { useState } from "react";
import CardPreview from "../card/card-preview";
import MainLogo from "../../../public/main-logo.png";
import HeaderImage from "../../../public/header-image.png";
import Details from "../form/details";
import { ProfileData } from "../profile/profile";
import { QRCodeSVG } from "qrcode.react";
import { useMediaQuery, useTheme } from "@mui/material";

export const Checkout: React.FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleFieldChange = (name?: string, dob?: string) => {
    setName(name || "");
    setDob(dob || "");
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const onSubmit = async (formData: ProfileData) => {
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

      if (data.qrCode) {
        setQrCode(data.qrCode);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="font-montserrat flex flex-col justify-center items-center ">
      <div className="relative bg-[#0101ff] pb-28 w-full">
        <div className="w-full flex items-center justify-center py-12 lg:py-6 ">
          <img
            src={MainLogo}
            height={isMobile ? 600 : 300}
            width={isMobile ? 600 : 300}
          />
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
      <div className="w-[50%]">
        <Details
          handleFieldChange={handleFieldChange}
          onSubmit={onSubmit}
          data={
            {
              emergencyContacts: [{ name: "", phone: "" }],
              insulinTypes: [{ type: "", dosage: "" }],
            } as ProfileData
          }
        />
        {qrCode && <QRCodeSVG value={qrCode} />}
      </div>

      {/* Preview Section (Desktop) */}
      {/* <div className="hidden lg:flex lg:basis-2/5 flex-col gap-8 items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className="font-bold text-5xl">Example card</h3>
          <p className=" text-md">
            Fill out the Full Name and Date of Birth fields to populate the
            example card
          </p>
        </div>

        <CardPreview
          fullName={name}
          dateOfBirth={dob}
          borderColour="#005EB8"
          textColour="#000000"
        />

        <p className="text-md text-red-600">
          All cards will resemble the preview above, though some text sizes may
          vary, particularly for longer names.
        </p>
      </div> */}

      {/* Mobile Preview (Sticky) */}
      {/* <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-md border-t p-4 z-50">
        <button
          className="w-full text-3xl bg-green-500 text-white p-6 rounded-md font-semibold"
          onClick={() => setIsPreviewVisible(!isPreviewVisible)}
        >
          {isPreviewVisible ? "Hide Card Preview" : "Show Card Preview"}
        </button>

        {isPreviewVisible && (
          <div className="mt-4 flex flex-col gap-12 py-4 items-center text-center bg-white">
            <div>
              <h3 className="font-bold text-6xl lg:text-xl">Example card</h3>
              <p className=" text-3xl pt-4">
                Fill out the Full Name and Date of Birth fields to populate the
                example card
              </p>
            </div>
            <CardPreview
              fullName={name}
              dateOfBirth={dob}
              borderColour="#005EB8"
              textColour="#000000"
            />
            <p className="text-3xl lg:text-sm text-red-600">
              All cards will resemble the preview above, though some text sizes
              may vary.
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
};
