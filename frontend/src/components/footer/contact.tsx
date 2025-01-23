import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className=" flex flex-col gap-4 items-center">
      {/* Title */}
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>

      {/* Introduction */}
      <Typography variant="h6" align="center" className="text-gray-700">
        We’d love to hear from you! If you have any questions or need
        assistance, feel free to reach out to us by contacting the below email
        address.
      </Typography>

      {/* Contact Form */}
      {/* <Box
        component="form"
        noValidate
        autoComplete="off"
        className="space-y-6 flex flex-col gap-4"
      >
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <Box flex="1">
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
            />
          </Box>
          <Box flex="1">
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              required
              type="email"
            />
          </Box>
        </Box>

        <Box>
          <TextField
            label="Your Message"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={6}
          />
        </Box>

        <Box className="text-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className="w-full sm:w-auto"
          >
            Send Message
          </Button>
        </Box>
      </Box> */}

      {/* Additional Contact Information */}
      <Box className="mt-4 text-center">
        <Typography variant="h4" className="text-gray-700 mb-4">
          Email:{" "}
          <a href="mailto:calum.diamedic@gmail.com" className="text-main-blue">
            calum.diamedic@gmail.com
          </a>
        </Typography>
      </Box>
      <Button
        className="mt-12 w-fit"
        variant="contained"
        onClick={() => navigate("/")}
      >
        Home
      </Button>
    </Container>
  );
};

export default ContactPage;
