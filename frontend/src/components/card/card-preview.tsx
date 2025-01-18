import { QRCodeSVG } from "qrcode.react";
import { FC } from "react";

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
  return (
    <div
      className={`w-96 h-60 font-roboto rounded-xl shadow-lg flex flex-col ${backgroundColor}`}
      style={{ aspectRatio: "1.586" }} // Standard credit card ratio
    >
      {/* Header */}
      <div className="bg-blue-700 rounded-t-xl flex items-center justify-center py-1">
        <h2 className="text-white font-bold text-lg">
          Diabetic Emergency Details
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex gap-2 pl-4 flex-1">
        {/* Left Column - Personal Details */}
        <div className="flex-1 flex flex-col justify-between pt-4">
          <div className="space-y-4">
            <h2 className="font-bold text-md min-h-[25px]">{fullName}</h2>
            <div className="space-y-1">
              <p className="text-sm">
                {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : ""}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium">
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
              size={100}
              level="L"
            />
          </div>
          <p className="text-xs text-center mt-2 opacity-70">
            Demo QR Code
            <br />
            Will be updated upon purchase
          </p>
        </div>

        {/* Small Column - Vertical Text */}
        <div className="bg-blue-700 w-[30px] rounded-t-none rounded-r-xl flex items-center pb-8 justify-center">
          <h2 className="text-white font-bold text-xs transform rotate-90 whitespace-nowrap">
            Diabetic Emergency Details
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
