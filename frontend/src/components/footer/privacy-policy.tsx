import { Container, Typography, Box, Link, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="py-12">
      {/* Title */}
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Privacy Policy
      </Typography>

      {/* Introduction */}
      <Typography variant="h6" className="mb-4 text-gray-700">
        At Diamedic, your privacy is important to us. This Privacy Policy
        outlines how we collect, use, and protect your personal information when
        you use our services. By accessing or using our website and services,
        you agree to the collection and use of information in accordance with
        this policy.
      </Typography>

      {/* Data Collection */}
      <Box className="my-6 flex flex-col gap-4">
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          1. Information We Collect
        </Typography>
        <Typography className="mb-4">
          We collect the following types of personal information when you use
          our website or services:
        </Typography>
        <ul className="list-disc ml-6">
          <li>Your name, email address, address and contact information</li>
          <li>Medical information related to your emergency details</li>
          <li>
            Payment information (card details). This information is stored on
            our payment provider, Stripe. It is never stored in our database.
          </li>
          <li>
            Usage data such as your IP address, browser type, and device
            information
          </li>
        </ul>
      </Box>

      {/* How We Use Your Data */}
      <Box className="mb-6">
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          2. How We Use Your Information
        </Typography>
        <Typography className="mb-4">
          We use the information we collect for the following purposes:
        </Typography>
        <ul className="list-disc ml-6">
          <li>To process and fulfill your orders and payments</li>
          <li>To provide you with access to your emergency medical details</li>
          <li>To improve our website, services, and customer experience</li>
          <li>
            To communicate with you, including sending order confirmations,
            updates, and marketing (if you opt-in)
          </li>
        </ul>
      </Box>

      {/* Data Storage and Security */}
      <Box className="mb-6">
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          3. Data Storage and Security
        </Typography>
        <Typography className="mb-4">
          We take reasonable steps to protect your personal information. Your
          data is encrypted and stored securely and is only accessible by
          scanning the QR code on your physical card. However, no method of data
          transmission over the Internet or method of electronic storage is 100%
          secure, so we cannot guarantee absolute security.
        </Typography>
      </Box>

      {/* Sharing of Information */}
      <Box className="mb-6">
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          4. Sharing of Information
        </Typography>
        <Typography className="mb-4">
          We do not sell, trade, or rent your personal information to third
          parties. We may share your information in the following circumstances:
        </Typography>
        <ul className="list-disc ml-6">
          <li>
            With service providers who assist in the operation of our business
            (e.g., payment processors, shipping carriers)
          </li>
          <li>As required by law or to comply with legal processes</li>
          <li>
            To protect the rights, property, or safety of Diamedic, our
            customers, or others
          </li>
        </ul>
      </Box>

      {/* Cookies */}
      <Box className="mb-6">
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          5. Cookies
        </Typography>
        <Typography className="mb-4">
          We use cookies to enhance your experience on our website. Cookies are
          small data files stored on your device that help us recognize your
          preferences and improve our website functionality. You can manage your
          cookie settings in your browser, but disabling cookies may affect
          certain features of our site.
        </Typography>
      </Box>

      {/* Your Rights */}
      <Box className="mb-6">
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          6. Your Rights
        </Typography>
        <Typography className="mb-4">
          You have the following rights regarding your personal information:
        </Typography>
        <ul className="list-disc ml-6">
          <li>The right to access and update your personal information</li>
          <li>
            The right to request the deletion of your personal information
          </li>
          <li>The right to opt-out of receiving marketing communications</li>
          <li>
            The right to object to the processing of your data in certain
            circumstances
          </li>
        </ul>
        <Typography className="mb-4">
          To exercise any of these rights, please contact us at{" "}
          <Link href="mailto:calum.diamedic@gmail.com">
            calum.diamedic@gmail.com
          </Link>
          .
        </Typography>
      </Box>

      {/* Changes to the Privacy Policy */}
      <Box className="mb-6">
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          7. Changes to This Privacy Policy
        </Typography>
        <Typography className="mb-4">
          We reserve the right to update or modify this Privacy Policy at any
          time. Any changes will be posted on this page with the updated date.
          We encourage you to review this Privacy Policy periodically to stay
          informed about how we are protecting your personal information.
        </Typography>
      </Box>

      {/* Contact Information */}
      <Box className="mb-6">
        <Typography variant="h6" fontWeight="bold" className="mb-2">
          8. Contact Us
        </Typography>
        <Typography className="mb-4">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </Typography>
        <Typography>
          Email:{" "}
          <Link href="mailto:calum.diamedic@gmail.com">
            calum.diamedic@gmail.com
          </Link>
        </Typography>
      </Box>
      <Button
        className="mb-4 w-fit"
        variant="contained"
        onClick={() => navigate("/")}
      >
        Home
      </Button>
    </Container>
  );
};

export default PrivacyPolicyPage;
