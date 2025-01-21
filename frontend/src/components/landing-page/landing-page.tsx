import {
  Button,
  Container,
  Typography,
  Card,
  ThemeProvider,
  createTheme,
} from "@mui/material";

export const LandingPage: React.FC = () => {
  const theme = createTheme({
    typography: { fontFamily: `"Montserrat", sans-serif` },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Hero Section */}
        <div className=" text-black py-20 text-center px-6">
          <Container maxWidth="lg" className="flex flex-col gap-12">
            <Typography
              variant="h2"
              fontWeight="bold"
              className="leading-tight text-4xl md:text-5xl"
            >
              Emergency Medical Info, Always at Your Fingertips
            </Typography>
            <div className="flex flex-col gap-2">
              <Typography variant="h5" className="mt-4 text-lg md:text-xl">
                The Diamedic card is a compact, wallet-sized card featuring a
                unique QR code that provides instant access to your emergency
                medical details.
              </Typography>
              <Typography variant="h6" className="text-lg md:text-xl">
                Designed specifically for diabetics, it offers more
                comprehensive information than traditional medical ID cards,
                including:
              </Typography>
            </div>

            <ul className=" text-lg text-gray-700 space-y-2 list-disc list-inside">
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
            <div>
              <Button
                variant="contained"
                size="large"
                className="px-10 py-4 text-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Get Your Card Now
              </Button>
            </div>
          </Container>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-20 px-4">
          <Container>
            <p className="text-6xl text-center font-bold lg:text-2xl pb-12">
              Why Choose Diamedic?
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
                    <span className="font-bold text-main-blue">
                      medical info
                    </span>{" "}
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
            <Typography
              variant="h3"
              align="center"
              fontWeight="bold"
              className="text-4xl md:text-5xl"
            >
              How It Works
            </Typography>

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
                  className="text-center md:text-left md:flex items-center space-y-4 md:space-y-0 md:space-x-8"
                >
                  <div className="flex-shrink-0 w-12">
                    {" "}
                    {/* Set a fixed width for the number */}
                    <Typography
                      variant="h3"
                      className="text-5xl font-bold text-teal-500"
                    >
                      {item.step}.
                    </Typography>
                  </div>
                  <div className="flex-grow">
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      className="text-xl mb-2"
                    >
                      {item.title}
                    </Typography>
                    <Typography className="text-lg text-gray-700">
                      {item.desc}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* Call to Action */}
        <div className="py-20 text-center bg-gradient-to-b from-blue-100 to-blue-200">
          <Container>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              className="text-3xl md:text-4xl font-semibold"
            >
              Get Your Diamedic Card Today
            </Typography>
            <Typography
              variant="h6"
              className="mt-4 text-gray-800 text-lg md:text-xl opacity-80"
            >
              Secure your emergency details in just minutes. Start now!
            </Typography>

            {/* Pricing Section */}
            <div className="mt-12 flex justify-center">
              <div className="p-8 bg-main-blue rounded-lg shadow-xl w-80 flex flex-col gap-6">
                <Typography
                  variant="h6"
                  className="font-bold text-white text-xl"
                >
                  Your Diamedic Card
                </Typography>
                <Typography
                  variant="h5"
                  className="text-3xl text-white font-semibold"
                >
                  £tbd
                </Typography>
                <Typography className="text-white opacity-80">
                  Includes 1 Diamedic card.
                </Typography>

                {/* Features List */}
                <ul className="mt-4 text-white opacity-80 space-y-2">
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
                <span className="italic text-white text-sm pt-4">
                  * Internet connection required to update information
                </span>

                {/* Call to Action */}
                <div className="mt-2">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="px-10 py-4 text-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white py-8 text-center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Diamedic. All rights reserved.
          </Typography>
          <div className="mt-6 space-x-6">
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
    </ThemeProvider>
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
    <Card className="shadow-xl flex flex-col gap-6 rounded-lg bg-white px-6 py-12 text-center hover:shadow-2xl transition duration-300">
      <p className="lg:text-2xl text-4xl font-bold">{title}</p>
      <p className="text-gray-700 lg:text-md text-2xl">{desc}</p>
    </Card>
  );
};
