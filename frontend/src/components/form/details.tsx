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

  //   const onSubmit = async (formData: ProfileData) => {
  //     const apiUrl = import.meta.env.VITE_API_URL;
  //     const fullPath = isCheckout
  //       ? `${apiUrl}/api/users`
  //       : `${apiUrl}/api/users/${data?.id}`;
  //     try {
  //       const response = await fetch(fullPath, {
  //         method: isCheckout ? "POST" : "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(formData),
  //       });

  //       const data = await response.json();

  //       if (data.qrCode) {
  //         setQrCode(data.qrCode);
  //       }
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //     }
  //   };

  const steps = ["Personal Details", "Emergency Details", "Payment"];
  return (
    <Box className=" mx-auto p-4">
      <Paper className="p-6">
        {isCheckout && (
          <Stepper activeStep={activeStep} className="mb-8 w-full">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {activeStep === 0 && (
            <Box className="space-y-4">
              <Typography variant="h6" className="mb-4">
                Personal Details
              </Typography>
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
                InputLabelProps={{ shrink: true }}
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
              />
              <TextField
                fullWidth
                label="Address Line 1"
                {...register("addressLine1", {
                  required: "Address is required",
                })}
                error={!!errors.addressLine1}
                helperText={errors.addressLine1?.message}
              />
              <TextField
                fullWidth
                label="Address Line 2 (Optional)"
                {...register("addressLine2")}
              />
              <TextField
                fullWidth
                label="City"
                {...register("city", { required: "City is required" })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
              <TextField
                fullWidth
                label="County (Optional)"
                {...register("county")}
              />
              <TextField
                fullWidth
                label="Postcode"
                {...register("postcode", { required: "Postcode is required" })}
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

          <Box className="flex justify-between mt-4">
            {activeStep > 0 && (
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button type="button" variant="contained" onClick={handleNext}>
                Next
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
