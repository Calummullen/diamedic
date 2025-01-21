import { Button, Container, Card } from "@mui/material";

export const LandingPage: React.FC = () => {
  return (
    <div className="font-montserrat">
      {/* Hero Section */}
      <div className=" text-black py-20 text-center px-6">
        <Container className="flex flex-col gap-12">
          <p className="leading-tight text-7xl lg:text-6xl">
            Emergency Medical Info, Always at Your Fingertips
          </p>
          <div className="flex flex-col gap-12 lg:gap-2">
            <p className="mt-4 text-4xl lg:text-xl">
              The Diamedic card is a compact, wallet-sized card featuring a
              unique QR code that provides instant access to your emergency
              medical details.
            </p>
            <p className="text-3xl lg:text-xl lg:font-bold">
              Designed specifically for diabetics, it offers more comprehensive
              information than traditional medical ID cards, including:
            </p>
          </div>

          <ul className="flex flex-col lg:gap-2 gap-8 text-3xl lg:text-lg lg:text-center text-start text-gray-700 space-y-2 list-disc lg:list-inside  list-outside pl-5">
            <li>
              <strong>Insulin types and dosages</strong> for precise treatment
              guidance
            </li>
            <li>
              <strong>Emergency protocols</strong> for managing hypo events,
              even if semi-conscious or unconscious
            </li>
            <li>
              <strong>Recommended food and drink</strong> to stabilize blood
              sugar levels, with guidance on when to use them
            </li>
          </ul>

          <div className="lg:mt-0 mt-12">
            <Button
              variant="contained"
              size="large"
              className="lg:h-fit h-[125px] px-10 py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              <p className="text-3xl lg:text-lg">Get Your Card Now</p>
            </Button>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-20 px-4">
        <Container>
          <p className="text-8xl text-center lg:text-4xl pb-24 lg:pb-12">
            Why Diamedic?
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-12 ">
            <LandingPageCard
              title="🚀 Instant Access"
              desc={
                <>
                  First responders can{" "}
                  <span className="font-bold text-main-blue">instantly</span>{" "}
                  scan your QR code to access critical medical details.
                </>
              }
            />
            <LandingPageCard
              title="🔄 Always Up-to-Date"
              desc={
                <>
                  Update your{" "}
                  <span className="font-bold text-main-blue">medical info</span>{" "}
                  at any time without needing to replace your card.
                </>
              }
            />
            <LandingPageCard
              title="🌍 Works Anywhere"
              desc={
                <>
                  <span className="font-bold text-main-blue">
                    Offline-ready
                  </span>{" "}
                  — your essential details are stored directly in the QR code.
                </>
              }
            />
          </div>
        </Container>
      </div>
      {/* How It Works */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20">
        <Container>
          <p className="text-center text-8xl lg:text-5xl">How It Works</p>

          <div className="mt-12 space-y-12">
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
                className="text-left flex lg:items-center gap-4 lg:space-y-4 px-12"
              >
                <div className="flex-shrink-0 w-12 lg:w-12">
                  <p className="text-6xl font-bold text-teal-500">
                    {item.step}.
                  </p>
                </div>
                <div className="flex-grow">
                  <p className="lg:text-xl text-5xl mb-2">{item.title}</p>
                  <p className="lg:text-lg text-3xl text-gray-700">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="py-20 text-center bg-gradient-to-b from-blue-100 to-blue-200">
        <Container>
          <p className="lg:text-3xl text-5xl text-main-blue font-semibold">
            Get Your Diamedic Card Today
          </p>
          <p className="lg:mt-2 mt-4 text-gray-800 text-3xl lg:text-xl opacity-80">
            Secure your emergency details in just minutes. Start now!
          </p>

          {/* Pricing Section */}
          <div className="mt-12 flex justify-center">
            <div className="p-8 bg-main-blue rounded-lg shadow-xl lg:w-80 flex flex-col gap-6">
              <p className="lg:font-normal font-bold text-white text-5xl lg:text-xl">
                Your Diamedic Card
              </p>
              <p className="lg:text-3xl text-5xl text-white font-semibold">
                £tbd
              </p>
              <p className="text-white lg:text-lg text-2xl opacity-80">
                Includes 1 Diamedic card.
              </p>

              {/* Features List */}
              <ul className="mt-4 text-white lg:text-sm text-4xl opacity-80 flex flex-col lg:gap-2 gap-8">
                <li className="flex items-center">
                  <span className="mr-2 text-teal-200">✔</span> Printed and
                  shipped to you
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-teal-200">✔</span> QR code for
                  instant access
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-teal-200">✔</span> Easy to carry
                  and use
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-teal-200">✔</span> Update your
                  details anytime*
                </li>
              </ul>
              <span className="italic text-white text-xl lg:text-sm pt-4">
                * Internet connection required to update information
              </span>

              {/* Call to Action */}
              <div className="mt-8 lg:mt-0 mb-4">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className="lg:h-fit h-[125px] px-10 py-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <p className="text-3xl lg:text-lg">Get Started</p>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 text-center">
        <p className="lg:text-lg text-3xl">
          © {new Date().getFullYear()} Diamedic. All rights reserved.
        </p>
        <div className="mt-6 space-x-6 lg:text-lg text-2xl">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Terms & Conditions
          </a>
          <a
            href="#"
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
  title,
  desc,
}: {
  title: string;
  desc: JSX.Element;
}) => {
  return (
    <Card className="shadow-xl flex flex-col gap-14 lg:gap-6 rounded-lg bg-white p-20 lg:px-6 lg:py-12 text-center hover:shadow-2xl transition duration-300">
      <p className="lg:text-xl lg:font-bold text-6xl">{title}</p>
      <p className="text-gray-700 lg:text-lg text-4xl">{desc}</p>
    </Card>
  );
};
