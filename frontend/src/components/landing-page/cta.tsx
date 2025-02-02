import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CTA: React.FC = () => {
  const navigate = useNavigate(); // Initialize the useHistory hook to navigate

  return (
    <div className="py-20 text-center bg-blue-50">
      <Container className="flex flex-col lg:gap-6 gap-12">
        <p className="lg:text-5xl text-7xl text-[#0101ff] font-bold">
          Get Your Diamedic Card Today
        </p>
        <p className="lg:mt-2 mt-4 text-black font-semibold text-5xl lg:text-xl">
          A Diamedic card is a one-time purchase (with free shipping). Once
          acquired, there are no recurring fees or additional costs.{" "}
        </p>

        {/* Pricing Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 text-start items-center">
          <div className="lg:p-6 p-12 bg-[#0101ff] rounded-lg shadow-xl mx-auto flex flex-col gap-6 items-center">
            <p className="lg:font-normal font-bold text-white text-6xl lg:text-3xl">
              Your Diamedic Card
            </p>
            <p className="lg:text-3xl text-5xl text-white font-semibold">£10</p>
            <p className="text-white lg:text-xl text-3xl">
              Includes 1 Diamedic card
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
              Designed specifically for diabetics, it offers more comprehensive
              information than traditional medical ID cards, including:
            </p>

            <ul className="flex flex-col px-16 lg:px-8 lg:gap-2 gap-10 text-5xl lg:text-lg text-start text-black list-disc list-outside">
              <li>
                <strong className="text-main-blue">
                  Insulin types and dosages
                </strong>{" "}
                for precise treatment guidance
              </li>
              <li>
                <strong className="text-main-blue">Emergency protocols</strong>{" "}
                for managing hypo events, even if semi-conscious or unconscious
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
  );
};
