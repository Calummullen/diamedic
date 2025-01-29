import { Button, Container } from "@mui/material";
import MainLogo from "../../../public/main-logo.png";
import HeaderImage from "../../../public/header-image.png";
import { useNavigate } from "react-router-dom";

export const Header: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#0101ff] pb-36">
      <div className="w-full flex items-center justify-center py-12 lg:py-6 ">
        <img
          src={MainLogo}
          height={isMobile ? 600 : 300}
          width={isMobile ? 600 : 300}
        />
      </div>
      <Container className="flex flex-col lg:flex-row gap-20 lg:gap-12 pb-24 pt-12 justify-between items-center">
        <div className="flex flex-col gap-36 lg:gap-12 text-start lg:basis-1/2 lg:mx-0 mx-12">
          <p className="leading-tight font-semibold text-8xl lg:text-6xl text-white">
            Emergency Info, Always at Your Fingertips
          </p>
          <p className="text-5xl lg:text-xl text-white">
            The Diamedic card is a compact, wallet-sized card featuring a unique
            QR code that provides instant access to your emergency medical
            details.
          </p>

          <Button
            onClick={() => navigate("/checkout")}
            variant="contained"
            size="large"
            className="lg:h-fit h-[125px] w-full lg:w-fit rounded-xl transition ease-in-out transform z-10"
          >
            <p className="text-3xl font-bold lg:text-xl">Get Your Card Now</p>
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
  );
};
