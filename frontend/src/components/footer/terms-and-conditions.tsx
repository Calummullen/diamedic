import { Container, Typography, Link, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="py-12">
      {/* Title */}
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Terms & Conditions
      </Typography>

      {/* Introduction */}
      <Typography variant="h6" className="mb-4 text-gray-700">
        Welcome to Diamedic. By using our services, you agree to the following
        terms and conditions:
      </Typography>

      {/* Terms List */}
      <Box className="mb-6 flex flex-col gap-4 mt-4">
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          1. General Use
        </Typography>
        <Typography className="mb-4">
          Diamedic provides a physical emergency medical card, designed to
          assist diabetics in emergencies. By using our service, you agree to
          provide accurate medical information to be displayed on our
          application (via a QR code scan). The service is intended for
          emergency use only and should not be used as a substitute for
          professional medical care.
        </Typography>

        <Typography variant="h6" fontWeight="bold" className="mb-2">
          2. Refunds & Cancellations
        </Typography>
        <Typography className="mb-4">
          We offer a refund within 14 days of purchase, provided the card has
          not been shipped. Cancellations must be requested via email at{" "}
          <Link href="mailto:calum.diamedic@gmail.com">
            calum.diamedic@gmail.com
          </Link>
          .
        </Typography>

        <Typography variant="h6" fontWeight="bold" className="mb-2">
          3. Service Limitations
        </Typography>
        <Typography className="mb-4">
          While Diamedic aims to ensure the availability and accuracy of your
          emergency medical details, we are not responsible for any errors or
          omissions in the information displayed, or for any damages arising
          from misuse.
        </Typography>

        <Typography variant="h6" fontWeight="bold" className="mb-2">
          4. Privacy & Data Protection
        </Typography>
        <Typography className="mb-4">
          All data entered onto our site is encrypted and stored securely. You
          have full control over what information is included. However, due to
          the nature of the product, anybody who scans your unique QR code will
          have access to your supplied data. By using our service, you consent
          to the collection and processing of your data in accordance with our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </Typography>
        {/* Orders, Pricing & Payment Section */}
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          5. Orders, Pricing & Payment
        </Typography>
        <Typography className="mb-4">
          By placing an order, you agree to pay the specified price at the time
          of purchase. All payments are due at the time of order and can be made
          through our available payment methods. Orders will only be processed
          once payment is successfully completed.
        </Typography>
        <Typography className="mb-4">
          The price includes the physical card, shipping, and handling. Any
          additional services, such as expedited shipping or customization, may
          incur additional charges.
        </Typography>
        <Typography className="mb-4">
          We reserve the right to modify pricing at any time without prior
          notice. However, any price changes will not affect orders that have
          already been processed and confirmed.
        </Typography>
        <Button
          className="mt-6 w-fit"
          variant="contained"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Box>

      {/* Download PDF Link */}
      <Box textAlign="center">
        {/* <Typography variant="h6" className="mb-4">
          You can also download a PDF version of our Terms & Conditions here:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/files/Diamedic_Terms.pdf"
          download
        >
          Download PDF
        </Button> */}
      </Box>
    </Container>
  );
};

export default TermsPage;
