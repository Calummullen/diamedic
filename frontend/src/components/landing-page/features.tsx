import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container } from "@mui/material";
import {
  faBolt,
  faSyncAlt,
  faSms,
  faPalette,
  faWallet,
  faMoneyBill1,
  faHandBackFist,
  faQrcode,
  faCreditCard,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import CardPreview from "../card/card-preview";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export const Features: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [borderColour, setBorderColour] = useState("#005EB8");
  const [textColour, setTextColour] = useState("#FFFFFF");
  const [isColourPickerOpen, setIsColourPickerOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#eff6ff] lg:pt-0 pt-36 pb-20 px-4">
      <Container className="flex flex-col gap-24 items-center">
        <p className="text-8xl text-center lg:text-6xl font-bold">
          Why Diamedic?
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 gap-12">
          <LandingPageCard
            icon={
              <FontAwesomeIcon
                icon={faBolt}
                size="7x"
                style={{ color: "orange" }}
              />
            }
            title="Instant Access"
            desc={
              <>
                The QR code can be scanned for{" "}
                <span className="font-bold text-main-blue">instant access</span>{" "}
                to access critical medical details.
              </>
            }
          />
          <LandingPageCard
            icon={
              <FontAwesomeIcon
                icon={faSms}
                size="7x"
                style={{ color: "orange" }}
              />
            }
            title="SMS Notifications"
            desc={
              <>
                Notify your
                <span className="font-bold text-main-blue">
                  {" "}
                  emergency contacts
                </span>{" "}
                (if enabled) anytime your QR code is scanned.
              </>
            }
          />
          <LandingPageCard
            icon={
              <FontAwesomeIcon
                icon={faSyncAlt}
                size="7x"
                style={{ color: "orange" }}
              />
            }
            title="Always Up-to-Date"
            desc={
              <>
                Update your{" "}
                <span className="font-bold text-main-blue">medical info</span>{" "}
                at any time without needing to replace your card.
              </>
            }
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-24 mt-8 items-center">
          <div className="flex flex-col gap-14 basis-1/3">
            <SmallCard
              icon={faPalette}
              title="Custom Colour"
              desc="Stick with the default blue or pick your own border colour to
              suit your style"
              align="text-start"
            />
            <SmallCard
              icon={faMoneyBill1}
              title="One-Time Purchase"
              desc="Your QR code is unique. Once purchased, you won't need to buy
              another!"
              align="text-start"
            />
            <SmallCard
              icon={faQrcode}
              title="Easy Access"
              desc="Simply can the QR code on any device to gain immediately
              access to emergency information"
              align="text-start"
              border={false}
            />
          </div>
          <div className="flex flex-col gap-4 items-center relative">
            {/* Card + Button */}
            <div className="flex flex-col lg:gap-4 gap-12 items-center">
              <CardPreview
                fullName="Test User"
                dateOfBirth="12/01/1990"
                borderColour={borderColour}
                textColour={textColour}
              />
              <Button
                variant="contained"
                onClick={() => setIsColourPickerOpen(!isColourPickerOpen)}
              >
                <p className="lg:text-xs text-4xl lg:p-0 p-4 ">
                  {isColourPickerOpen ? "Close " : "Open "} Colour Picker
                </p>
              </Button>
            </div>

            {/* Color Pickers */}
            {isColourPickerOpen && (
              <div className="lg:absolute left-0 right-0 top-full flex flex-col items-center w-full">
                <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-12 lg:gap-4 p-4 ">
                  <div className="flex flex-col gap-4 items-center lg:text-xl text-5xl">
                    <p>Card Border Colour</p>
                    <HexColorPicker
                      style={isMobile ? { width: 500, height: 500 } : {}}
                      color={borderColour}
                      onChange={setBorderColour}
                    />
                  </div>
                  <div className="flex flex-col gap-4 items-center lg:text-xl text-5xl">
                    <p>Text Colour</p>
                    <HexColorPicker
                      style={isMobile ? { width: 500, height: 500 } : {}}
                      color={textColour}
                      onChange={setTextColour}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-14 basis-1/3">
            <SmallCard
              icon={faWallet}
              title="Standard Wallet Fit"
              desc="Fits perfectly in your wallet, with the outter edge visible to
              attract attention"
              align="text-end"
            />
            <SmallCard
              icon={faHandBackFist}
              title="Durable Material"
              desc="Crafted from durable PVC, your Diamedic card is sturdy,
              waterproof, and built to withstand any conditions."
              align="text-end"
            />
            <SmallCard
              icon={faCreditCard}
              title="Free Replacement"
              desc="If your card is lost or stolen, you can get a replacement free
              of charge (with proof of purchase)"
              align="text-end"
              border={false}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

const LandingPageCard = ({
  icon,
  title,
  desc,
}: {
  icon: JSX.Element;
  title: string;
  desc: JSX.Element;
}) => {
  return (
    <div className=" bg-white shadow-md flex flex-col lg:mx-0 mx-24 gap-14 lg:gap-6 rounded-3xl px-16 py-36 lg:px-6 lg:py-12 text-center hover:shadow-xl transition duration-300">
      {icon}
      <p className="lg:text-3xl font-bold text-6xl text-black">{title}</p>
      <p className="text-black lg:text-lg text-4xl">{desc}</p>
    </div>
  );
};

const SmallCard = ({
  icon,
  title,
  desc,
  align,
  border = true,
}: {
  icon: IconDefinition;
  title: string;
  desc: string;
  align: "text-start" | "text-end";
  border?: boolean;
}) => (
  <div
    className={`space-y-2 ${
      border && "border-b-2 pb-14 border-gray-200"
    } ${align}`}
  >
    <FontAwesomeIcon
      icon={icon}
      className="text-[#0101ff] lg:mb-0 mb-8 text-6xl lg:text-2xl"
    />
    <p className="font-bold text-black text-5xl lg:text-xl">{title}</p>
    <p className="text-4xl lg:text-lg">{desc}</p>
  </div>
);
