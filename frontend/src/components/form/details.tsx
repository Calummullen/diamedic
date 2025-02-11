import React, { FC, useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray, FieldError } from "react-hook-form";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Paper,
  IconButton,
  Divider,
  Tooltip,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProfileData } from "../profile/profile";
import CardPreview from "../card/card-preview";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { ColourPalette } from "../coloir-picker/colour-palette";
import { useIsMobile } from "../../hooks/useIsMobile";
import { loadStripe } from "@stripe/stripe-js";
import LoadingSpinner from "../loading/loading-spinner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CardPreviewProps {
  // onSubmit: (formData: ProfileData) => void;
  isLoading: boolean;
  // userId?: string;
  data?: ProfileData;
  isCheckout?: boolean;
}

const Details: FC<CardPreviewProps> = ({
  data,
  isLoading = false,
  isCheckout = true,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || undefined; // Load from storage if available
  });

  const isMobile = useIsMobile();

  const onSubmit = async (formData: ProfileData) => {
    // setError(null);
    // setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log("User ID after creation", data);
      if (data.userId) {
        setUserId(data.userId);
        setActiveStep(3);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // setError(
      //   error instanceof Error
      //     ? error.message
      //     : "An unexpected error occurred. If the error persists, please contact us."
      // );
    } finally {
      // setIsLoading(false);
    }
  };

  const fetchClientSecret = async () => {
    // Create a Checkout Session
    localStorage.setItem("userId", userId || "");
    console.log("ahhhhh, userId", userId);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );
    const data = await res.json();

    return data.clientSecret;
  };

  const options = { fetchClientSecret };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    watch,
  } = useForm<ProfileData>({
    mode: "onChange",
    defaultValues: {
      meta: {
        cardBorderColour: "#0000FF",
        cardTextColour: "#FFFFFF",
        matchBorderColour: false,
      },
      ...data,
    },
  });
  const borderColour = watch("meta.cardBorderColour");
  const textColour = watch("meta.cardTextColour");
  const matchBorderColour = watch("meta.matchBorderColour") ?? false;

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({ control, name: "emergencyContacts" });

  const {
    fields: insulinFields,
    append: appendInsulin,
    remove: removeInsulin,
  } = useFieldArray({ control, name: "insulinTypes" });
  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    let fieldsToValidate: (keyof ProfileData)[] = [];

    switch (activeStep) {
      case 0:
        fieldsToValidate = ["name", "age", "dateOfBirth", "email"];
        break;
      case 1:
        fieldsToValidate = [
          "emergencyContacts",
          "insulinTypes",
          "emergencyInstructions",
        ];
    }
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const steps = [
    "Personal Details",
    "Emergency Details",
    "Customise Card",
    // "Payment",
  ];

  return isLoading ? (
    <div className="mx-auto p-2">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="mx-auto p-2">
      {isCheckout && (
        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      <Box>
        <Paper className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {activeStep === 0 && (
              <Box className="space-y-8 md:space-y-4">
                <p className="mb-4 md:text-xl text-2xl">Personal Details</p>
                <TextField
                  fullWidth
                  label="Full Name"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 0, message: "Age must be positive" },
                  })}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                />
                <TextField
                  type="email"
                  fullWidth
                  label="Email"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box className="space-y-6 md:space-y-4">
                <p className=" md:text-xl text-2xl">Emergency Contacts</p>
                <p className="md:text-xs text-xl">
                  You have the option to enable SMS notifications for each of
                  your emergency contacts, ensuring they are alerted whenever
                  your QR code is scanned.
                </p>
                {contactFields.map((field, index) => (
                  <Box
                    key={field.id}
                    className="flex flex-col md:bg-white bg-gray-50 gap-4 w-full md:border-none border border-gray-300 md:p-0 p-5 rounded-lg md:shadow-none shadow-sm"
                  >
                    <div className="flex md:flex-row flex-col gap-4 md:gap-4">
                      <TextField
                        className="flex-1 bg-white"
                        label="Emergency Contact Name"
                        {...register(
                          `emergencyContacts.${index}.name` as const,
                          {
                            required: "Contact name is required",
                          }
                        )}
                        error={!!errors.emergencyContacts?.[index]?.name}
                        helperText={
                          errors.emergencyContacts?.[index]?.name?.message
                        }
                      />
                      <TextField
                        className="flex-1 bg-white"
                        label="Phone Number"
                        {...register(
                          `emergencyContacts.${index}.phone` as const,
                          {
                            required: "Phone number is required",
                          }
                        )}
                        error={!!errors.emergencyContacts?.[index]?.phone}
                        helperText={
                          errors.emergencyContacts?.[index]?.phone?.message
                        }
                      />
                      {contactFields.length > 1 && !isMobile && (
                        <IconButton
                          onClick={() => removeContact(index)}
                          color="error"
                          className="w-fit"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                    <Box className="flex items-center ml-2 justify-start flex-row md:gap-6 gap-12 md:text-lg text-xl">
                      <label className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          className="md:w-3 w-6 md:h-3 h-6  accent-blue-600" // Adjust size and color
                          {...register(`emergencyContacts.${index}.notifySMS`)}
                        />
                        <span>Notify via SMS</span>
                      </label>
                      <Tooltip
                        title="By ticking this box, your emergency contact will receive notifications anytime the QR code is scanned."
                        arrow
                      >
                        <InfoIcon color="action" />
                      </Tooltip>
                    </Box>
                    {contactFields.length > 1 && isMobile && (
                      <Button
                        onClick={() => removeContact(index)}
                        variant="contained"
                        color="error"
                        className="w-full"
                      >
                        <div className="flex flex-row gap-3 items-center">
                          <DeleteIcon />
                          <p className="text-md">Remove Emergency Contact</p>
                        </div>
                      </Button>
                    )}
                  </Box>
                ))}
                <Button
                  className="flex flex-row md:gap-1 gap-3"
                  onClick={() => appendContact({ name: "", phone: "" })}
                >
                  <AddIcon />
                  <p className="md:text-sm text-xl">Add Emergency Contact</p>
                </Button>
                <Divider className="pt-4 md:pt-0" />
                <p className="md:text-xl text-2xl">Insulin Information</p>
                {insulinFields.map((field, index) => (
                  <Box
                    key={field.id}
                    className="flex flex-col md:bg-white bg-gray-50 gap-4 w-full md:border-none border border-gray-300 md:p-0 p-5 rounded-lg md:shadow-none shadow-sm"
                  >
                    <div className="flex md:flex-row flex-col gap-4 md:gap-4">
                      <TextField
                        className="flex-1 bg-white"
                        label="Insulin Type"
                        {...register(`insulinTypes.${index}.type`, {
                          required: "Insulin type is required",
                        })}
                        error={!!errors.insulinTypes?.[index]?.type}
                        helperText={
                          (errors.insulinTypes?.[index]?.type as FieldError)
                            ?.message
                        }
                      />

                      <TextField
                        className="flex-1 bg-white"
                        label="Dosage"
                        {...register(`insulinTypes.${index}.dosage` as const, {
                          required: "Dosage is required",
                        })}
                        {...(isMobile && {
                          slotProps: { inputLabel: { shrink: true } },
                        })}
                        error={!!errors.insulinTypes?.[index]?.dosage}
                        helperText={
                          errors.insulinTypes?.[index]?.dosage?.message
                        }
                      />

                      {insulinFields.length > 1 &&
                        (isMobile ? (
                          <Button
                            onClick={() => removeInsulin(index)}
                            variant="contained"
                            color="error"
                            className="w-full"
                          >
                            <div className="flex flex-row gap-3 items-center">
                              <DeleteIcon />
                              <p className="text-md">Remove Insulin Entry</p>
                            </div>
                          </Button>
                        ) : (
                          <IconButton
                            onClick={() => removeInsulin(index)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        ))}
                    </div>
                  </Box>
                ))}
                <Button
                  className="flex flex-row md:gap-1 gap-3"
                  onClick={() => appendInsulin({ type: "", dosage: "" })}
                >
                  <AddIcon />
                  <p className="md:text-sm text-xl">Add Insulin Type</p>
                </Button>
                <TextField
                  fullWidth
                  multiline
                  placeholder=""
                  rows={5}
                  label="Instructions for Emergency Services"
                  {...register("emergencyInstructions", {
                    required: "Emergency instructions are required",
                  })}
                  error={!!errors.emergencyInstructions}
                  helperText={errors.emergencyInstructions?.message}
                />
              </Box>
            )}

            {activeStep === 2 && (
              <Box className="flex flex-col gap-4 items-center relative">
                <Alert severity="warning" className="md:w-[75%] mb-6">
                  <p className="text-md md:text-sm text-black mb-2">
                    To ensure your card looks great, choose a text color that
                    contrasts well with the background.
                  </p>
                  <p className="text-md md:text-sm text-black">
                    - To hide text, match the text color to the background.{" "}
                    <br />- To remove the border, set both the text and border
                    color to white.
                  </p>
                </Alert>

                {/* Card + Button */}
                <div className="flex flex-col md:gap-4 gap-12 items-center">
                  <CardPreview
                    fullName="Test User"
                    dateOfBirth="12/01/1990"
                    borderColour={borderColour}
                    textColour={textColour}
                    diabetesTextColour={
                      matchBorderColour ? borderColour : "#000000"
                    }
                  />
                </div>
                <div className="flex items-center gap-4 my-6 md:my-0 mx-4">
                  <input
                    type="checkbox"
                    className="w-10 h-10 md:w-6 md:h-6"
                    checked={matchBorderColour}
                    onChange={(e) => {
                      setValue("meta.matchBorderColour", e.target.checked);
                    }}
                  />
                  <label className="md:text-sm text-md">
                    Match "Type 1 Diabetic" text with border colour
                  </label>
                </div>
                {/* Color Pickers */}
                <ColourPalette setValue={setValue} watch={watch} />
              </Box>
            )}

            {activeStep === 3 && (
              <Box className="space-y-4">
                <div id="checkout">
                  <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={options}
                  >
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                </div>
                {/* <Typography variant="h6" className="mb-4">
                  Payment Details - tbd
                </Typography> */}
                {/* <TextField
              fullWidth
              label="Payment Information (Placeholder)"
              {...register("paymentPlaceholder")}
            /> */}
              </Box>
            )}

            <Box
              className={`flex md:flex-row flex-col ${
                activeStep > 0 ? "justify-between" : "justify-end"
              } gap-4 md:pt-4 pt-4`}
            >
              {activeStep > 0 && (
                <Button
                  className="md:h-fit w-full md:w-fit rounded-full transition duration-300 ease-in-out transform"
                  type="button"
                  variant="outlined"
                  onClick={handleBack}
                >
                  <p className="text-3xl md:text-xl">Back</p>
                </Button>
              )}
              {activeStep < steps.length - 1 && (
                <Button
                  className="md:h-fit w-full md:w-fit rounded-full transition duration-300 ease-in-out transform"
                  type="button"
                  variant="contained"
                  onClick={handleNext}
                >
                  <p className="text-3xl md:text-lg">Next</p>
                </Button>
              )}

              {activeStep === 2 && (
                <Button
                  className="md:h-fit w-full md:w-fit rounded-full transition duration-300 ease-in-out transform"
                  type="submit"
                  variant="contained"
                >
                  <p className="text-3xl md:text-xl">
                    {isCheckout ? "Proceed to Payment" : "Save"}
                  </p>
                </Button>
              )}
            </Box>
          </form>
          {/* {qrCode && (
      <div>
        <h2>Scan this QR code to access the emergency information:</h2>
        <img src={qrCode} alt="QR Code" />
      </div>
    )} */}
        </Paper>
      </Box>
    </div>
  );
};

export default Details;
