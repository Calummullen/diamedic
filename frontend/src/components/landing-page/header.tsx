import { Button, Container } from "@mui/material";
import MainLogo from "../../../public/main-logo.png";
import HeaderImage from "../../../public/header-image.png";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="relative bg-[#0101ff] pb-16 md:pb-36">
      <div className="w-full flex items-center justify-center py-4 md:py-6 ">
        <img
          alt="Main Logo"
          rel="preload"
          src={MainLogo}
          height={isMobile ? 250 : 300}
          width={isMobile ? 250 : 300}
        />
      </div>
      <Container className="flex flex-col md:flex-row py-12 gap-4 md:gap-12 justify-between items-center">
        <div className="flex flex-col gap-12 md:gap-12 text-start md:basis-1/2 md:mx-0 mx-2">
          <h1 className="leading-tight font-semibold text-4xl md:text-6xl text-white">
            Emergency Info, Always at Your Fingertips
          </h1>
          <p className="text-xl md:text-xl text-white">
            The Diamedic card is a compact, wallet-sized card with a unique QR
            code that provides instant access to your critical medical
            information in case of a severe low blood sugar episode.
          </p>

          <Button
            aria-label="Get Your Card Now"
            onClick={() => navigate("/checkout")}
            variant="contained"
            className="md:h-[50px] md:w-fit rounded-xl transition ease-in-out transform z-10"
          >
            <p className="text-3xl font-bold md:text-xl">Get Your Card Now</p>
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center md:basis-1/2 gap-12 px-2  pt-12 md:pt-0 md:px-0">
          <img
            alt="Header image"
            rel="preload"
            className="rounded-[25rem]"
            src={HeaderImage}
          />
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
