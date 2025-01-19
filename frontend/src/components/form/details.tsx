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
import { QRCodeSVG } from "qrcode.react";

interface CardPreviewProps {
  handleFieldChange: (name?: string, dob?: string) => void;
}

interface FormData {
  // Personal Details
  name: string;
  age: number;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county: string;
  postcode: string;

  // Emergency Details
  emergencyContacts: {
    name: string;
    phone: string;
  }[];
  insulinTypes: {
    type: string;
    dosage: string;
  }[];
  emergencyInstructions: string;

  // Payment Details
  paymentPlaceholder: string;
}

const Details: FC<CardPreviewProps> = ({ handleFieldChange }) => {
  console.log("aaa", import.meta.env);
  const [activeStep, setActiveStep] = useState(0);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      emergencyContacts: [{ name: "", phone: "" }],
      insulinTypes: [{ type: "", dosage: "" }],
    },
  });
  const [qrCode, setQrCode] = useState<string | null>(null);
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

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

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
  //   const onSubmit = async (data: FormData) => {
  //     // Handle form submission
  //     const response = await fetch("http://localhost:5000/users", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       console.error("Error generating QR code:", await response.text());
  //       return;
  //     }

  //     const responseData = await response.json();
  //     const decodedData = Buffer.from(responseData.data, "base64").toString();

  //     console.log("responseData", decodedData);
  //     // Generate QR code with both userId and token
  //     const qrCodeUrl = `http://localhost:5000/u?data=${encodeURIComponent(
  //       decodedData
  //     )}`;
  //     setQrCode(qrCodeUrl);
  //   };

  const onSubmit = async (data: FormData) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error generating QR code:", await response.text());
      return;
    }

    const responseData = await response.json();
    console.log("responseData", responseData);
    const qrCodeUrl = `${apiUrl}/api/u?data=${encodeURIComponent(
      responseData.data
    )}`;
    console.log("qrCodeUrl", qrCodeUrl);
    setQrCode(qrCodeUrl);
  };

  const steps = ["Personal Details", "Emergency Details", "Payment"];

  return (
    <Box className=" mx-auto p-4">
      <Paper className="p-6">
        <Stepper activeStep={activeStep} className="mb-8 w-full">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
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
                Payment Details
              </Typography>
              <TextField
                fullWidth
                label="Payment Information (Placeholder)"
                {...register("paymentPlaceholder")}
              />
            </Box>
          )}

          <Box className="flex justify-between mt-4">
            {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" variant="contained" disabled={!isValid}>
                Submit
              </Button>
            )}
          </Box>
        </form>
        \
        {qrCode && (
          <div>
            <h2>Scan this QR code to access the emergency information:</h2>
            <QRCodeSVG value={qrCode} />
          </div>
        )}
      </Paper>
    </Box>
  );
};

export default Details;
