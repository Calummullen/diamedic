import { Container, Typography, Box, Link, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/header";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container maxWidth="md" className="pb-12">
        {/* Title */}
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Privacy Policy
        </Typography>

        {/* Introduction */}
        <Typography variant="h6" className="mb-4 text-gray-700">
          This Privacy Policy explains how Calum Mullen trading as Diamedic
          ("we," "us," or "our") collects, uses, and protects your personal
          information. By using our website and services, you agree to this
          policy.
        </Typography>

        {/* Data Collection */}
        <Box className="my-6 flex flex-col gap-4">
          <Typography variant="h6" fontWeight="bold" className="mb-2">
            1. Information We Collect
          </Typography>
          <Typography className="mb-4">
            We collect the following types of personal information:
          </Typography>
          <ul className="list-disc ml-6">
            <li>Your full name, email, address, and contact details</li>
            <li>Medical details for your emergency page</li>
            <li>
              Payment information (processed securely by Stripe, never stored on
              our servers)
            </li>
            <li>Usage data (IP address, browser type, device details)</li>
          </ul>
        </Box>

        {/* How We Use Your Data */}
        <Box className="mb-6">
          <Typography variant="h6" fontWeight="bold" className="mb-2">
            2. How We Use Your Information
          </Typography>
          <ul className="list-disc ml-6">
            <li>To process and fulfill your orders</li>
            <li>To provide access to your emergency medical details</li>
            <li>To improve our services and customer experience</li>
            <li>To communicate important updates and (optional) marketing</li>
          </ul>
        </Box>

        {/* Data Storage and Security */}
        <Box className="mb-6">
          <Typography variant="h6" fontWeight="bold" className="mb-2">
            3. Data Storage and Security
          </Typography>
          <Typography className="mb-4">
            Your emergency details are stored in our database and only
            accessible via scanning the QR code on your Diamedic card. While we
            take security seriously, no online system is 100% secure. By
            purchasing a Diamedic card, you acknowledge the medical information
            is accessible by anybody scanning your QR code and doesn't require
            any kind of login.
          </Typography>
        </Box>

        {/* Sharing of Information */}
        <Box className="mb-6">
          <Typography variant="h6" fontWeight="bold" className="mb-2">
            4. Sharing of Information
          </Typography>
          <ul className="list-disc ml-6">
            <li>
              With essential service providers (e.g., payment processors,
              shipping carriers)
            </li>
            <li>When required by law</li>
            <li>To protect the rights and security of users and Diamedic</li>
          </ul>
        </Box>

        {/* Cookies */}
        <Box className="mb-6">
          <Typography variant="h6" fontWeight="bold" className="mb-2">
            5. Cookies
          </Typography>
          <Typography className="mb-4">
            We use cookies to enhance site functionality. You can disable
            cookies in your browser settings, but some features may be affected.
          </Typography>
        </Box>

        {/* Your Rights */}
        <Box className="mb-6">
          <Typography variant="h6" fontWeight="bold" className="mb-2">
            6. Your Rights
          </Typography>
          <ul className="list-disc ml-6">
            <li>Access, update, or request deletion of your personal data</li>
            <li>Opt-out of marketing emails</li>
            <li>Object to certain data processing</li>
          </ul>
          <Typography className="mb-4">
            To exercise these rights, contact us at{" "}
            <Link href="mailto:calum@diamedic.co.uk">calum@diamedic.co.uk</Link>
            .
          </Typography>
        </Box>

        {/* Changes to Privacy Policy */}
        <Box className="mb-6">
          <Typography variant="h6" fontWeight="bold" className="mb-2">
            7. Changes to This Privacy Policy
          </Typography>
          <Typography className="mb-4">
            We may update this Privacy Policy periodically. Changes will be
            posted on this page.
          </Typography>
        </Box>

        {/* Contact Information */}
        <Box className="mb-6">
          <Typography variant="h6" fontWeight="bold" className="mb-2">
            8. Contact Us
          </Typography>
          <Typography className="mb-4">
            If you have any questions, please contact us at:
          </Typography>
          <Typography>
            Email:{" "}
            <Link href="mailto:calum@diamedic.co.uk">calum@diamedic.co.uk</Link>
          </Typography>
        </Box>

        <Button
          className="mb-4 w-full md:w-fit"
          variant="contained"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Container>
    </>
  );
};

export default PrivacyPolicyPage;
