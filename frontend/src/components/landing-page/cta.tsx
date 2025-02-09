import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="md:py-20 py-12 text-center bg-blue-50">
      <Container className="flex flex-col md:gap-6 gap-2">
        <p className="md:text-5xl text-3xl text-[#0101ff] font-bold">
          Get Your Diamedic Card Today
        </p>
        <p className="md:mt-2 mt-4 text-black font-semibold text-xl md:text-xl">
          A Diamedic card is a one-time purchase (with free shipping). Once
          acquired, there are no recurring fees or additional costs.
        </p>

        {/* Pricing Section */}
        <div className="mt-12 mx-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Single Pricing Card (Fixed) */}
          <div className="p-8 bg-[#3366FF] rounded-2xl shadow-xl flex flex-col gap-6">
            {/* Card Header */}
            <div className="text-center">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-3">
                Your Diamedic Card
              </h2>
              <p className="text-white text-2xl md:text-4xl font-semibold">
                £12.99
              </p>
              <p className="text-white text-lg md:text-xl mt-1 opacity-90">
                Includes 1 Diamedic card
              </p>
            </div>

            {/* Card Features */}
            <div className="space-y-3 text-white text-md">
              <p>
                Designed for diabetics, providing comprehensive medical details:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-lg">✔</span>
                  <strong>Insulin types and dosages</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✔</span>
                  <strong>Emergency protocols</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✔</span>
                  <strong>Recommended food and drink</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg">✔</span>
                  <strong>Diabetic-specific information</strong>
                </li>
              </ul>
            </div>

            {/* Disclaimer */}
            <span className="text-white text-xs italic opacity-80">
              * Internet connection required to update information
            </span>

            {/* Call-to-Action Button */}
            <div className="mt-4">
              <Button
                onClick={() => navigate("/checkout")}
                sx={{
                  background: "linear-gradient(to right, #FFD700, #FFA500)",
                  color: "#000",
                  "&:hover": {
                    background: "linear-gradient(to right, #FFA500, #FF8C00)",
                    transform: "scale(1.05)",
                  },
                }}
                variant="contained"
                className="w-full py-3 rounded-full shadow-md"
              >
                <span className="text-md font-semibold">Get Started</span>
              </Button>
            </div>
          </div>

          {/* Coming Soon Wristband Card */}
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
