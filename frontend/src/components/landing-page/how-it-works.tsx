import { Container } from "@mui/material";
import TypingImage from "../../../public/typing.png";
import WalletImage from "../../../public/wallet.png";
import PrinterImage from "../../../public/printer.jpeg";

export const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white text-black py-20">
      <Container>
        <h2 className="text-center font-semibold text-5xl md:text-7xl">
          How It Works
        </h2>

        <div className="flex flex-col gap-14 mt-14">
          {[
            {
              step: "1",
              title: "Create Your Profile",
              desc: "Enter your emergency contacts and medical information in just a few minutes",
              img: TypingImage,
            },
            {
              step: "2",
              title: "Get Your QR Code",
              desc: "We generate and print a unique QR code onto a compact, wallet-sized card",
              img: PrinterImage,
            },
            {
              step: "3",
              title: "Stay Protected",
              desc: "Keep your Diamedic card with you for instant access anytime, anywhere",
              img: WalletImage,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex md:flex-row flex-col-reverse items-center gap-8 shadow-md border-x-0 border-[1px] rounded-3xl p-4 md:p-16"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-5xl font-bold text-yellow-500">
                    {item.step}.
                  </p>
                </div>
                <div>
                  <p className="md:text-4xl text-2xl mb-3 font-bold">
                    {item.title}
                  </p>
                  <p className="md:text-xl text-xl text-gray-700">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div>
                <img
                  alt="Typing Image"
                  className="w-[225px] h-[150px]"
                  src={item.img}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
