import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQPage = () => {
  return (
    <Container maxWidth="md" className="py-12">
      {/* Title */}
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Frequently Asked Questions (FAQs)
      </Typography>

      {/* Introduction */}
      <Typography variant="h6" align="center" className="text-gray-700">
        Here are some common questions we get about Diamedic. If you have any
        other inquiries, feel free to reach out to us!
      </Typography>

      {/* FAQ Accordion */}
      <Box className="space-y-4 mt-8">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1-header">
            <Typography variant="h6">What is a Diamedic card?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A Diamedic card is a compact, wallet-sized card with a unique QR
              code that links to your emergency medical details. It is designed
              specifically for diabetics and allows important information such
              as insulin types, dosages, and emergency instructions to be
              quickly accessed by first responders or members of the public.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2-header">
            <Typography variant="h6">How do I get my Diamedic card?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Simply fill out your emergency medical information through our
              easy-to-use online form, and we’ll generate your Diamedic card
              with a unique QR code that links to your personal details. We then
              print and ship it directly to you.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3-header">
            <Typography variant="h6">
              How long does it take to receive my card?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Once your order is placed, you can expect to receive your Diamedic
              card within 3-7 business days, depending on your location and
              demand.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel4-header">
            <Typography variant="h6">
              Is the Diamedic card waterproof?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              While the Diamedic card is designed to be durable and resistant to
              wear, it is not fully waterproof. We recommend keeping it in a
              safe place in your wallet to avoid exposure to excessive moisture.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel5-header">
            <Typography variant="h6">
              What happens if my card is lost or damaged?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              If your Diamedic card is lost or damaged, you can easily request a
              replacement through our website. We'll send you a new card with
              updated information if necessary.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel6-header">
            <Typography variant="h6">
              How secure is my personal information?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Your personal information is securely stored and only accessible
              through the QR code linked to your card. We use industry-standard
              encryption to ensure your data remains private and protected.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel7-header">
            <Typography variant="h6">
              Can I update my medical details on the Diamedic card?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes! You can update your medical information anytime via our
              portal. Once updated, the QR code on your Diamedic card will
              reflect the changes.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default FAQPage;
