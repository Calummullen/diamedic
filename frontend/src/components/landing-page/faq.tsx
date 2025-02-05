import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const FAQ = () => {
  const accordionSx = {
    boxShadow: "0px 0.5px 1.25px rgba(0, 0, 0, 0.5)", // Add shadow here
    padding: "15px",
  };
  const sx = {
    fontSize: {
      xs: "1.0rem", // font size for extra small screens
      sm: "1.5rem", // font size for small screens
      md: "1.5rem", // font size for medium screens
      lg: "1.25rem", // font size for large screens
    },
  };
  return (
    <div className="bg-white text-black">
      <Container className="py-12 flex flex-col gap-8 bg-white">
        {/* Title */}
        <p className="md:text-3xl text-3xl text-center">
          Frequently Asked Questions (FAQs)
        </p>

        {/* Introduction */}
        <Typography
          variant="h6"
          align="center"
          className="text-gray-700"
          sx={sx}
        >
          Here are some common questions we get about Diamedic. If you have any
          other inquiries, feel free to reach out to us!
        </Typography>

        {/* FAQ Accordion */}
        <Box className="space-y-4">
          <Accordion sx={accordionSx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel1-header"
            >
              <Typography sx={sx} variant="h6">
                What is a Diamedic card?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={sx}>
                A Diamedic card is a compact, wallet-sized card with a unique QR
                code that links to your emergency medical details. It is
                designed specifically for diabetics and allows important
                information such as insulin types, dosages, and emergency
                instructions to be quickly accessed by first responders or
                members of the public.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={accordionSx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel2-header"
            >
              <Typography sx={sx} variant="h6">
                How do I get my Diamedic card?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={sx}>
                Simply fill out your emergency medical information through our
                easy-to-use online form, and we’ll generate your Diamedic card
                with a unique QR code that links to your personal details. We
                then print and ship it directly to you.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={accordionSx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel3-header"
            >
              <Typography sx={sx} variant="h6">
                How long does it take to receive my card?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={sx}>
                Once your order is placed, you can expect to receive your
                Diamedic card within 3-7 business days, depending on your
                location and demand.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={accordionSx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel4-header"
            >
              <Typography sx={sx} variant="h6">
                Is the Diamedic card waterproof?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={sx}>
                While the Diamedic card is designed to be durable and resistant
                to wear, it is not fully waterproof. We recommend keeping it in
                a safe place in your wallet to avoid exposure to excessive
                moisture.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={accordionSx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel5-header"
            >
              <Typography sx={sx} variant="h6">
                What happens if my card is lost or damaged?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={sx}>
                If your Diamedic card is lost or damaged, you can easily request
                a replacement through our website. We'll send you a new card
                with updated information if necessary.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={accordionSx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel6-header"
            >
              <Typography sx={sx} variant="h6">
                How secure is my personal information?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={sx}>
                Your personal information is securely stored and accessible
                through the QR code linked to your card. While this provides
                less security than a traditional login, this is required to
                enable first responders and bystanders to access your emergency
                information.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={accordionSx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel7-header"
            >
              <Typography sx={sx} variant="h6">
                Can I update my medical details on the Diamedic card?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={sx}>
                Yes! You can update your medical information anytime via our
                portal. Once updated, the QR code on your Diamedic card will
                reflect the changes.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </div>
  );
};
