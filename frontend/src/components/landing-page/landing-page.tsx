import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardPreview from "../card/card-preview";
import HeaderImage from "../../../public/header-image.png";
import FAQPage from "../faq/faq";
import ConfirmDialog from "../confirm/confirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { useEffect, useState } from "react";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize the useHistory hook to navigate
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (navigator.permissions) {
      const getPermission = async () => {
        const { state } = await navigator.permissions.query({
          name: "geolocation",
        });
        setDialogOpen(state !== "granted");
      };
      getPermission();
    }
  }, []);

  const handleConfirm = () => {
    setDialogOpen(false);

    // Call Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location:", position.coords);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  const handleCancel = () => {
    setDialogOpen(false);
    console.log("User denied location access.");
  };

  return (
    <div className="font-montserrat bg-blue-200">
      <ConfirmDialog
        open={dialogOpen}
        message="We need your location to provide emergency services. Do you want to allow location access?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {/* Hero Section */}
      <div className="relative bg-[#0101ff] pb-36">
        <Container className="flex flex-col lg:flex-row gap-20 lg:gap-12 p-24 justify-between items-center">
          <div className="flex flex-col gap-36 lg:gap-12 text-start lg:basis-1/2 lg:mx-0 mx-12">
            <p className="leading-tight font-bold text-8xl lg:text-6xl text-white">
              Emergency Info, Always at Your Fingertips
            </p>
            <p className="text-5xl lg:text-xl text-white">
              The Diamedic card is a compact, wallet-sized card featuring a
              unique QR code that provides instant access to your emergency
              medical details.
            </p>

            <Button
              onClick={() => navigate("/checkout")}
              variant="contained"
              size="large"
              className="lg:h-fit h-[125px] w-full lg:w-fit rounded-xl transition ease-in-out transform z-10"
            >
              <p className="text-3xl lg:text-lg">Get Your Card Now</p>
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center lg:basis-1/2 gap-12 px-16 pt-12 lg:pt-0 lg:px-0">
            <img className="rounded-[25rem]" src={HeaderImage} />
          </div>
        </Container>

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
              fill="#eff6ff" // Matches bg-blue-50
              d="M0,224 C480,320 960,128 1440,224 L1440,320 L0,320 Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
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
                  <span className="font-bold text-main-blue">
                    instant access
                  </span>{" "}
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
            <CardPreview
              fullName="Test User"
              dateOfBirth="12/01/1990"
              backgroundColor={""}
            />
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

      {/* How It Works */}
      <div className="bg-white text-black py-20">
        <Container>
          <p className="text-center text-9xl lg:text-5xl">How It Works</p>

          <div className="mt-28 lg:mt-12 mb-12 lg:mb-0 space-y-12">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                desc: "Enter your emergency contacts and medical information in just a few minutes.",
              },
              {
                step: "2",
                title: "Get Your QR Code",
                desc: "We generate and print a unique QR code onto a compact, wallet-sized card that links to your emergency details.",
              },
              {
                step: "3",
                title: "Stay Protected",
                desc: "Keep your Diamedic card with you for instant access anytime, anywhere.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-left flex lg:items-center gap-12 lg:gap-8 px-12"
              >
                <div className="flex-shrink-0 w-12">
                  <p className="text-7xl font-bold text-teal-500">
                    {item.step}.
                  </p>
                </div>
                <div className="flex-grow">
                  <p className="lg:text-xl text-6xl mb-2 font-bold">
                    {item.title}
                  </p>
                  <p className="lg:text-lg text-4xl text-gray-700">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="py-20 text-center bg-blue-50">
        <Container className="flex flex-col lg:gap-2 gap-12">
          <p className="lg:text-5xl text-8xl text-[#0101ff] font-semibold">
            Get Your Diamedic Card Today
          </p>
          <p className="lg:mt-2 mt-4 text-gray-800 text-5xl lg:text-xl opacity-80">
            A Diamedic card is a one-time purchase (with free shipping). Once
            acquired, there are no recurring fees or additional costs.{" "}
          </p>

          {/* Pricing Section */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 text-start items-center">
            <div className="lg:p-6 p-12 bg-[#0101ff] rounded-lg shadow-xl mx-auto flex flex-col gap-6 items-center">
              <p className="lg:font-normal font-bold text-white text-6xl lg:text-3xl">
                Your Diamedic Card
              </p>
              <p className="lg:text-3xl text-5xl text-white font-semibold">
                £tbd
              </p>
              <p className="text-white lg:text-xl text-3xl">
                Includes 1 Diamedic card.
              </p>

              {/* Features List */}
              <ul className="mt-4 text-white lg:text-lg text-4xl flex flex-col lg:gap-2 gap-8">
                <li className="flex items-center">
                  <span className="lg:mr-2 mr-6 text-green-400">✔</span> Printed
                  and shipped to you
                </li>
                <li className="flex items-center">
                  <span className="lg:mr-2 mr-6 text-green-400">✔</span> QR code
                  for instant access
                </li>
                <li className="flex items-center">
                  <span className="lg:mr-2 mr-6 text-green-400">✔</span> Easy to
                  carry and use
                </li>
                <li className="flex items-center">
                  <span className="lg:mr-2 mr-6 text-green-400">✔</span> Update
                  your details anytime*
                </li>
              </ul>
              <span className="italic text-white text-2xl lg:text-sm pt-4">
                * Internet connection required to update information
              </span>

              {/* Call to Action */}
              <div className="mt-8 lg:mt-0 mb-4">
                <Button
                  onClick={() => navigate("/checkout")}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#F0F0F0",
                    },
                  }}
                  variant="contained"
                  size="large"
                  className="lg:h-fit h-[100px] w-full lg:w-fit px-10 py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <p className="text-3xl lg:text-lg">Get Started</p>
                </Button>
              </div>
            </div>
            <div>
              <p className="text-5xl lg:text-xl lg:font-bold lg:my-0 my-16 lg:mb-4 px-6">
                Designed specifically for diabetics, it offers more
                comprehensive information than traditional medical ID cards,
                including:
              </p>

              <ul className="flex flex-col px-16 lg:px-8 lg:gap-2 gap-10 text-5xl lg:text-lg text-start text-gray-700 list-disc list-outside">
                <li>
                  <strong className="text-main-blue">
                    Insulin types and dosages
                  </strong>{" "}
                  for precise treatment guidance
                </li>
                <li>
                  <strong className="text-main-blue">
                    Emergency protocols
                  </strong>{" "}
                  for managing hypo events, even if semi-conscious or
                  unconscious
                </li>
                <li>
                  <strong className="text-main-blue">
                    Recommended food and drink
                  </strong>{" "}
                  to stabilize blood sugar levels, with guidance on when to use
                  them
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ */}
      <div className="bg-white">
        <FAQPage />
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 text-center">
        <p className="lg:text-lg text-4xl">
          © {new Date().getFullYear()} Diamedic. All rights reserved.
        </p>
        <div className="my-8 space-x-6 lg:text-lg text-3xl">
          <a
            href="/privacy-policy"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-and-conditions"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Terms & Conditions
          </a>
          <a
            href="/contact"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Contact
          </a>
        </div>
      </div>
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
    <div className=" bg-white shadow-md flex flex-col gap-14 lg:gap-6 rounded-3xl p-20 lg:px-6 lg:py-12 text-center hover:shadow-xl transition duration-300">
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
