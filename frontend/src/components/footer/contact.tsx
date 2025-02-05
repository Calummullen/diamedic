import { Container, Typography, Box, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="py-12 flex flex-col items-center">
      {/* Title */}
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>

      {/* Introduction */}
      <Typography variant="h6" align="center" color="textSecondary">
        We’d love to hear from you! If you have any questions or need
        assistance, feel free to reach out via email.
      </Typography>

      {/* Additional Contact Information */}
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Email:
        </Typography>
        <Link
          href="mailto:calum@diamedic.com"
          variant="h4"
          color="primary"
          underline="hover"
        >
          calum@diamedic.com
        </Link>
      </Box>

      <Button
        variant="contained"
        className="w-full"
        onClick={() => navigate("/")}
      >
        Home
      </Button>
    </Container>
  );
};

export default ContactPage;
