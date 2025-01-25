import { QRCodeSVG } from "qrcode.react";
import { FC, useEffect, useState } from "react";

interface CardPreviewProps {
  fullName: string;
  dateOfBirth: string;
  backgroundColor: string;
}

const CardPreview: FC<CardPreviewProps> = ({
  fullName,
  dateOfBirth,
  backgroundColor,
}) => {
  const [qrSize, setQrSize] = useState(100); // Default size for desktop

  useEffect(() => {
    const updateSize = () => {
      setQrSize(window.innerWidth < 1024 ? 200 : 100); // 200px for mobile, 100px for desktop
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className={`w-[48rem] h-[30rem] lg:w-[480px] lg:h-[280px] font-roboto rounded-xl shadow-lg flex flex-col ${backgroundColor}`}
      style={{ aspectRatio: "1.586" }} // Standard credit card ratio
    >
      {/* Header */}
      <div className="bg-blue-700 rounded-t-xl flex items-center justify-center py-3 lg:py-1">
        <h2 className="text-white font-bold text-4xl lg:text-lg">
          Diabetic Emergency Details
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex gap-2 pl-4 flex-1">
        {/* Left Column - Personal Details */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-8 lg:space-y-4">
            <h2 className="font-bold text-5xl lg:text-2xl min-h-[25px]">
              {fullName}
            </h2>
            <div className="space-y-1">
              <p className="text-5xl lg:text-lg">
                {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : ""}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-2xl lg:text-sm font-medium">
                I'm a Type 1 Diabetic.
                <br />
                All my medical details are
                <br />
                available by scanning the QR code.
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
          <p className="text-2xl lg:text-xs text-center mt-2 opacity-70">
            Demo QR Code
            <br />
            Will be updated upon purchase
          </p>
        </div>

        {/* Small Column - Vertical Text */}
        <div className="bg-blue-700 w-[60px] lg:w-[30px] rounded-t-none rounded-r-xl flex items-center pb-8 justify-center">
          <h2 className="text-white font-bold text-3xl lg:text-xs transform rotate-90 whitespace-nowrap">
            Diabetic Emergency Details
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
