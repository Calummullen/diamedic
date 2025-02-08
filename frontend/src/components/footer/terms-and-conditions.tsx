import { Container, Typography, Link, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/header";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container maxWidth="md" className="pb-12">
        {/* Title */}
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Terms & Conditions
        </Typography>

        {/* Introduction */}
        <Typography variant="h6" className="mb-4 text-gray-700">
          These Terms & Conditions govern the use of services provided by Calum
          Mullen trading as Diamedic ("we," "us," or "our"). By using our
          services, you agree to these terms.
        </Typography>

        {/* Terms List */}
        <Box className="mb-6 flex flex-col gap-4 mt-4">
          <Typography variant="h6" fontWeight="bold" className="mb-2">
            1. General Use
          </Typography>
          <Typography className="mb-4">
            Diamedic provides a wallet-sized emergency medical card designed for
            diabetics. By using our service, you agree to provide accurate
            information for display via a QR code scan. This service is for
            emergency use only and is not a substitute for professional medical
            care.
          </Typography>

          <Typography variant="h6" fontWeight="bold" className="mb-2">
            2. Refunds & Cancellations
          </Typography>
          <Typography className="mb-4">
            We offer refunds within 14 days of purchase if the card has not yet
            been shipped. Cancellation requests must be sent via email to{" "}
            <Link href="mailto:calum@diamedic.co.uk">calum@diamedic.co.uk</Link>
            .
          </Typography>

          <Typography variant="h6" fontWeight="bold" className="mb-2">
            3. Service Limitations
          </Typography>
          <Typography className="mb-4">
            While we strive for accuracy and availability, Diamedic is not
            responsible for errors, omissions, or any damages resulting from the
            use or misuse of this service.
          </Typography>

          <Typography variant="h6" fontWeight="bold" className="mb-2">
            4. Privacy & Data Protection
          </Typography>
          <Typography className="mb-4">
            Your data is stored in our database. However, due to the nature of
            the product, anyone scanning your QR code can access your emergency
            details. By using this service, you consent to data collection and
            processing as outlined in our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </Typography>

          <Typography variant="h6" fontWeight="bold" className="mb-2">
            5. Orders, Pricing & Payment
          </Typography>
          <Typography className="mb-4">
            By placing an order, you agree to pay the listed price at checkout.
            Payments are processed at the time of order, and orders are only
            fulfilled upon successful payment.
          </Typography>
          <Typography className="mb-4">
            Pricing includes the card, standard shipping, and handling.
            Additional services, such as expedited shipping or customizations,
            may have extra charges.
          </Typography>
          <Typography className="mb-4">
            We reserve the right to change pricing at any time. However, any
            changes will not affect already confirmed and processed orders.
          </Typography>
          <Button
            className="mt-6 w-full md:w-fit"
            variant="contained"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default TermsPage;
