import React, { FC, useState } from "react";
import { useForm, useFieldArray, FieldError } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProfileData } from "../profile/profile";

interface CardPreviewProps {
  handleFieldChange: (name?: string, dob?: string) => void;
  onSubmit: (formData: ProfileData) => void;
  data?: ProfileData;
  isCheckout?: boolean;
}

const Details: FC<CardPreviewProps> = ({
  handleFieldChange,
  onSubmit,
  data,
  isCheckout = true,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const sxTheme = (overrideFontSize?: string) => {
    return {
      [theme.breakpoints.down("lg")]: {
        "& .MuiInputBase-root": {
          fontSize: overrideFontSize || "3.5rem", // Increase input text size
          paddingLeft: "1rem",
          height: "125px", // Increase height (default is 40px)
        },
        "& .MuiFormLabel-root": {
          fontSize: "3rem", // Increase label size
          marginLeft: "1rem", // Adjust label position
          marginTop: "-1rem",
        },
        "& .MuiFormHelperText-root.Mui-error": {
          fontSize: "1.5rem", // Increase error text size
        },
      },
    };
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const {
    register,
    control,
    handleSubmit,
    // formState: { errors, isValid },
    formState: { errors },
    trigger,
    watch,
  } = useForm<ProfileData>({
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });
  //   const [qrCode, setQrCode] = useState<string | null>(null);
  const name = watch("name", "");
  const dob = watch("dateOfBirth", "");

  React.useEffect(() => {
    handleFieldChange(name, dob);
  }, [name, dob, handleFieldChange]);

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
    e.preventDefault(); // Prevent form submission
    let fieldsToValidate: (keyof ProfileData)[] = [];

    switch (activeStep) {
      case 0:
        fieldsToValidate = [
          "name",
          "age",
          "dateOfBirth",
          "addressLine1",
          "city",
          "postcode",
        ];
        break;
      case 1:
        fieldsToValidate = [
          "emergencyContacts",
          "insulinTypes",
          "emergencyInstructions",
        ];
        break;
    }
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const steps = ["Personal Details", "Emergency Details", "Payment"];

  return (
    <Box className=" mx-auto p-4">
      <Paper className="p-6">
        {isCheckout && (
          <Stepper activeStep={activeStep} className="mb-8 w-full">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={(theme) => ({
                    "& .MuiStepLabel-label": {
                      fontSize: "1.5rem", // Default font size
                      [theme.breakpoints.up("lg")]: {
                        fontSize: "1rem", // Larger font size for 'lg' and above
                      },
                    },
                  })}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {activeStep === 0 && (
            <Box className="space-y-12 lg:space-y-4">
              <p className="mb-12 lg:mb-4 lg:text-xl text-5xl">
                Personal Details
              </p>
              <TextField
                fullWidth
                label="Full Name"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                {...(isMobile && {
                  slotProps: { inputLabel: { shrink: true } },
                })}
                sx={sxTheme()}
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
                {...(isMobile && {
                  slotProps: { inputLabel: { shrink: true } },
                })}
                sx={sxTheme("4.25rem")}
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
                {...(isMobile && {
                  slotProps: { inputLabel: { shrink: true } },
                })}
                sx={{
                  [theme.breakpoints.down("lg")]: {
                    "& .MuiInputBase-root": {
                      fontSize: "3.25rem", // Increase input text size
                      paddingLeft: "1rem",
                      height: "125px", // Increase height (default is 40px)
                    },
                    "& .MuiFormLabel-root": {
                      fontSize: "3rem", // Increase label size
                      marginLeft: "1rem", // Adjust label position
                      marginTop: "-1rem",
                    },
                  },
                }}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
              />
              <TextField
                fullWidth
                label="Address Line 1"
                {...register("addressLine1", {
                  required: "Address is required",
                })}
                {...(isMobile && {
                  slotProps: { inputLabel: { shrink: true } },
                })}
                sx={sxTheme("3.25rem")}
                error={!!errors.addressLine1}
                helperText={errors.addressLine1?.message}
              />
              <TextField
                fullWidth
                label="Address Line 2 (Optional)"
                {...register("addressLine2")}
                {...(isMobile && {
                  slotProps: { inputLabel: { shrink: true } },
                })}
                sx={sxTheme("3.25rem")}
              />
              <TextField
                fullWidth
                label="City"
                {...register("city", { required: "City is required" })}
                {...(isMobile && {
                  slotProps: { inputLabel: { shrink: true } },
                })}
                sx={sxTheme("4rem")}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
              <TextField
                fullWidth
                label="County (Optional)"
                {...register("county")}
                {...(isMobile && {
                  slotProps: { inputLabel: { shrink: true } },
                })}
                sx={sxTheme("3.25rem")}
              />
              <TextField
                fullWidth
                label="Postcode"
                {...register("postcode", { required: "Postcode is required" })}
                {...(isMobile && {
                  slotProps: { inputLabel: { shrink: true } },
                })}
                sx={sxTheme("3.5rem")}
                error={!!errors.postcode}
                helperText={errors.postcode?.message}
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box className="space-y-4">
              <Typography variant="h6" className="mb-4">
                Emergency Contacts
              </Typography>
              {contactFields.map((field, index) => (
                <Box key={field.id} className="flex gap-4 flex-row">
                  <TextField
                    className="flex-1"
                    label="Emergency Contact Name"
                    {...register(`emergencyContacts.${index}.name` as const, {
                      required: "Contact name is required",
                    })}
                    error={!!errors.emergencyContacts?.[index]?.name}
                    helperText={
                      errors.emergencyContacts?.[index]?.name?.message
                    }
                  />
                  <TextField
                    className="flex-1"
                    label="Phone Number"
                    {...register(`emergencyContacts.${index}.phone` as const, {
                      required: "Phone number is required",
                    })}
                    error={!!errors.emergencyContacts?.[index]?.phone}
                    helperText={
                      errors.emergencyContacts?.[index]?.phone?.message
                    }
                  />
                  {contactFields.length > 1 && (
                    <IconButton onClick={() => removeContact(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => appendContact({ name: "", phone: "" })}
              >
                Add Emergency Contact
              </Button>

              <Divider className="my-4" />

              <Typography variant="h6" className="mb-4">
                Insulin Information
              </Typography>
              {insulinFields.map((field, index) => (
                <Box key={field.id} className="flex gap-4 flex-row w-full">
                  <TextField
                    className="flex-1"
                    label="Insulin Type"
                    {...register(`insulinTypes.${index}.type` as const, {
                      required: "Insulin type is required",
                    })}
                    error={!!errors.insulinTypes?.[index]?.type}
                    helperText={
                      (errors.insulinTypes?.[index]?.type as FieldError)
                        ?.message
                    }
                  />
                  <TextField
                    className="flex-1"
                    label="Dosage"
                    {...register(`insulinTypes.${index}.dosage` as const, {
                      required: "Dosage is required",
                    })}
                    error={!!errors.insulinTypes?.[index]?.dosage}
                    helperText={errors.insulinTypes?.[index]?.dosage?.message}
                  />
                  {insulinFields.length > 1 && (
                    <IconButton onClick={() => removeInsulin(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => appendInsulin({ type: "", dosage: "" })}
              >
                Add Insulin Type
              </Button>

              <Divider className="my-4" />

              <Typography variant="h6" className="mb-4">
                Emergency Instructions
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
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
            <Box className="space-y-4">
              <Typography variant="h6" className="mb-4">
                Payment Details - tbd
              </Typography>
              {/* <TextField
                fullWidth
                label="Payment Information (Placeholder)"
                {...register("paymentPlaceholder")}
              /> */}
            </Box>
          )}

          <Box className="flex justify-between lg:pt-4 pt-12 pb-24">
            {activeStep > 0 && (
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                className="lg:h-fit h-[125px] w-full lg:w-fit rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                type="button"
                variant="contained"
                onClick={handleNext}
              >
                <p className="text-5xl lg:text-xl">Next</p>
              </Button>
            ) : (
              //   <Button type="submit" variant="contained" disabled={!isValid}>
              //     {isCheckout ? "Submit" : "Save"}
              //   </Button>

              <Button type="submit" variant="contained" disabled>
                {isCheckout ? "Submit" : "Save"}
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
  );
};

export default Details;
