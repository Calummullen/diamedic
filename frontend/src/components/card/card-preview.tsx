import { useMediaQuery, useTheme } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { FC, useEffect, useState } from "react";

interface CardPreviewProps {
  fullName: string;
  dateOfBirth: string;
  borderColour: string;
  textColour: string;
}

const CardPreview: FC<CardPreviewProps> = ({
  fullName,
  dateOfBirth,
  borderColour,
  textColour,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [qrSize, setQrSize] = useState(isMobile ? 225 : 150); // Default size for desktop

  useEffect(() => {
    setQrSize(isMobile ? 225 : 150);
  }, [isMobile]);

  return (
    <div
      className={`h-[30rem] bg-white lg:h-[280px] font-montserrat rounded-xl shadow-lg flex flex-col `}
      style={{ aspectRatio: "1.586" }} // Standard credit card ratio
    >
      {/* Header */}
      <div
        className={`rounded-t-xl flex items-center justify-center py-3 lg:py-1`}
        style={{ backgroundColor: borderColour }}
      >
        <h2
          style={{ color: textColour }}
          className="font-bold text-4xl lg:text-lg"
        >
          Diabetic Emergency Details
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex gap-2 pl-4 flex-1">
        {/* Left Column - Personal Details */}
        <div className="flex-1 flex flex-col justify-center font-montserrat">
          <div className="flex flex-col gap-14 lg:gap-6">
            <p className="text-5xl lg:text-3xl">
              I'm a{" "}
              <span className="text-[#5268ff] font-bold">Type 1 Diabetic</span>
            </p>
            <div>
              <p className="text-3xl lg:text-lg font-medium">
                All my emergency details are available by scanning the QR code.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - QR Code */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white p-2 rounded-lg">
            <QRCodeSVG
              value="https://example.com/placeholder"
              size={qrSize}
              level="L"
            />
          </div>
          <div className="flex items-center flex-col">
            <p className="text-4xl font-bold lg:text-lg text-center lg:my-0 my-2">
              Test User
            </p>
            <p className="text-2xl lg:text-lg">Date of Birth</p>
          </div>
          {/* <p className="text-2xl lg:text-xs text-center mt-2 opacity-70">
            Demo QR Code
            <br />
            Will be updated upon purchase
          </p> */}
        </div>

        {/* Small Column - Vertical Text */}
        <div
          style={{ backgroundColor: borderColour }}
          className="w-[60px] lg:w-[30px] rounded-t-none rounded-r-xl flex items-center pb-8 justify-center"
        >
          <h2
            style={{ color: textColour }}
            className="font-bold text-2xl lg:text-xs transform rotate-90 whitespace-nowrap"
          >
            Diabetic Emergency Details
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
