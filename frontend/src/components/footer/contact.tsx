import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/header";

const ContactPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  // React Hook Form Setup
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Validates on change
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      requiresReplacement: false,
      orderNumber: "",
    },
  });

  // Watch replacement checkbox state
  const requiresReplacement = watch("requiresReplacement");

  // Handle Form Submission
  const onSubmit = async (data: any) => {
    console.log("Submitting:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating API delay
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="md"
        className="pb-12 flex flex-col gap-6 items-start"
      >
        {/* Page Title */}
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Contact Us
        </Typography>

        {/* Contact Form */}
        <Card className="w-full">
          <CardContent>
            <Typography variant="body1" color="textSecondary" paragraph>
              Fill out the form below, and we’ll get back to you as soon as
              possible.
            </Typography>

            {submitted ? (
              <Alert severity="success">
                Thank you! Your message has been sent.
              </Alert>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Name Field */}
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />

                {/* Email Field */}
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />

                {/* Phone Field */}
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />

                {/* Message Field */}
                <Controller
                  name="message"
                  control={control}
                  rules={{ required: "Message is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  )}
                />

                {/* Card Replacement Section */}
                <Divider flexItem />

                <Typography variant="h6" component="h3">
                  Card Replacement Request
                </Typography>

                <Controller
                  name="requiresReplacement"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="I need a replacement Diamedic card"
                    />
                  )}
                />

                {requiresReplacement && (
                  <>
                    <Alert severity="warning">
                      As per our policy, each Diamedic card purchase includes
                      one free replacement. If you need additional replacements
                      beyond this, a new purchase will be required.
                    </Alert>

                    <Controller
                      name="orderNumber"
                      control={control}
                      rules={{
                        required: requiresReplacement
                          ? "Order number is required"
                          : false,
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Order Number"
                          variant="outlined"
                          placeholder="Enter your order number"
                          error={!!errors.orderNumber}
                          helperText={errors.orderNumber?.message}
                        />
                      )}
                    />
                  </>
                )}

                {/* Submit Button (Disabled Until Valid) */}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValid}
                >
                  Submit
                </Button>
                <Divider />
                <p className="font-montserrat">
                  If the above form doesn't work, please contact us at{" "}
                  <a
                    className="text-blue-500"
                    href="mailto:calum@diamedic.co.uk"
                  >
                    calum@diamedic.co.uk
                  </a>
                </p>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Home Button */}
        <Button
          variant="contained"
          className="md:w-fit w-full mt-6"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Container>
    </>
  );
};

export default ContactPage;
