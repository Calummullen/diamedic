import { Container } from "@mui/material";
import TypingImage from "../../../public/typing.png";
import WalletImage from "../../../public/wallet.png";
import PrinterImage from "../../../public/printer.jpeg";

export const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white text-black py-20">
      <Container>
        <p className="text-center font-semibold text-9xl lg:text-7xl">
          How It Works
        </p>

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
              desc: "We generate and print a unique QR code onto a compact, wallet-sized card that links to your emergency details",
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
              className="flex lg:flex-row flex-col-reverse items-center gap-8 px-12 shadow-md border-x-0 border-[1px] rounded-3xl p-24 lg:p-16"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-9xl font-bold text-yellow-500">
                    {item.step}.
                  </p>
                </div>
                <div>
                  <p className="lg:text-4xl text-6xl mb-6 font-bold">
                    {item.title}
                  </p>
                  <p className="lg:text-xl text-4xl text-gray-700">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div>
                <img width={300} height={300} src={item.img} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
