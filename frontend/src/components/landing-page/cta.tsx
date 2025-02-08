import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CTA: React.FC = () => {
  const navigate = useNavigate(); // Initialize the useHistory hook to navigate

  return (
    <div className="md:py-20 py-12 text-center bg-blue-50">
      <Container className="flex flex-col md:gap-6 gap-2">
        <p className="md:text-5xl text-3xl text-[#0101ff] font-bold">
          Get Your Diamedic Card Today
        </p>
        <p className="md:mt-2 mt-4 text-black font-semibold text-xl md:text-xl">
          A Diamedic card is a one-time purchase (with free shipping). Once
          acquired, there are no recurring fees or additional costs.{" "}
        </p>

        {/* Pricing Section */}
        <div className="mt-12 mx-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 bg-[#0101ff] rounded-lg shadow-xl flex flex-col md:gap-6 gap-2 items-center">
            <p className="md:font-normal font-bold text-white text-2xl md:text-3xl">
              Your Diamedic Card
            </p>
            <p className="md:text-4xl text-xl text-white font-semibold">
              £12.99
            </p>
            <p className="text-white md:text-xl text-lg">
              Includes 1 Diamedic card
            </p>

            {/* Features List */}

            <p className="text-md text-white">
              Designed specifically for diabetics, it offers more comprehensive
              information than traditional medical ID cards, including:
            </p>

            <ul className="flex flex-col text-start list-disc list-outside text-white">
              <li>
                <strong className="">Insulin types and dosages</strong>{" "}
              </li>
              <li>
                <strong className="">Emergency protocols</strong>{" "}
              </li>
              <li>
                <strong className="">Recommended food and drink</strong>{" "}
              </li>
              <li>
                <strong className="e">Diabetic-specific information</strong>{" "}
              </li>
            </ul>

            {/* <ul className="mt-4 text-white md:text-lg text-lg flex flex-col gap-2">
              <li className="flex items-center">
                <span className="md:mr-2 mr-6 text-green-400">✔</span> Printed
                and shipped to you
              </li>
              <li className="flex items-center">
                <span className="md:mr-2 mr-6 text-green-400">✔</span> QR code
                for instant access
              </li>
              <li className="flex items-center">
                <span className="md:mr-2 mr-6 text-green-400">✔</span> Easy to
                carry and use
              </li>
              <li className="flex items-center">
                <span className="md:mr-2 mr-6 text-green-400">✔</span> Update
                your details anytime*
              </li>
            </ul> */}
            <span className="italic text-white text-md md:text-sm pt-4">
              * Internet connection required to update information
            </span>

            {/* Call to Action */}
            <div className="mt-4 md:mt-0 mb-2">
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
                className="md:h-fit h-[70px] w-full md:w-fit px-10 py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                <p className="text-3xl md:text-lg">Get Started</p>
              </Button>
            </div>
          </div>
          <div className="md:h-full h-[526px] bg-green-300 text-black rounded-lg shadow-xl flex flex-col justify-center items-center relative">
            {/* Coming Soon Badge */}
            <div className="absolute top-3 right-3 bg-black text-white px-4 py-1 rounded-full text-sm font-semibold">
              Coming Soon
            </div>

            {/* Centered Title */}
            <p className="md:font-normal font-bold text-2xl md:text-3xl text-center">
              Your Diamedic Wristband
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
