import React, { FC, useState } from "react";
import { useForm, useFieldArray, FieldError } from "react-hook-form";
import InfoIcon from "@mui/icons-material/Info";
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
  Tooltip,
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
          fontSize: overrideFontSize || "3.5rem",
          paddingLeft: "1rem",
          height: "125px",
        },
        "& .MuiFormLabel-root": {
          fontSize: "3rem",
          marginLeft: "1rem",
          marginTop: "-1rem",
        },
        "& .MuiFormHelperText-root.Mui-error": {
          fontSize: "1.5rem",
        },
      },
    };
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm<ProfileData>({
    mode: "onChange",
    defaultValues: {
      ...data,
    },
  });
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
    e.preventDefault();
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
    // const isStepValid = await trigger(fieldsToValidate);
    // if (isStepValid)
    setActiveStep((prev) => prev + 1);
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
                      fontSize: "1.5rem",
                      [theme.breakpoints.up("lg")]: {
                        fontSize: "1rem",
                      },
                    },
                    "& .MuiStepIcon-root": {
                      fontSize: "2.5rem",
                      marginRight: "0.5rem",
                      marginLeft: "0.5rem",
                      [theme.breakpoints.up("lg")]: {
                        fontSize: "1.5rem",
                        marginRight: "0rem",
                        marginLeft: "0rem",
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
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{
                  [theme.breakpoints.down("lg")]: {
                    "& .MuiInputBase-root": {
                      fontSize: "3.25rem",
                      paddingLeft: "1rem",
                      height: "125px",
                    },
                    "& .MuiFormLabel-root": {
                      fontSize: "3rem",
                      marginLeft: "1rem",
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
            <Box className="space-y-6 lg:space-y-4">
              <p className=" lg:text-xl text-5xl">Emergency Contacts</p>
              <p className="lg:text-xs text-xl">
                You have the option to enable SMS and/or email notifications for
                your emergency contacts, ensuring they are alerted whenever your
                QR code is scanned.
              </p>
              {contactFields.map((field, index) => (
                <Box
                  key={field.id}
                  className="flex flex-col gap-6 lg:bg-white bg-gray-50  lg:gap-4 w-full lg:border-none border border-gray-300 lg:p-0 p-12 rounded-lg lg:shadow-none shadow-sm"
                >
                  <div className="flex lg:flex-row flex-col gap-12 lg:gap-4">
                    <TextField
                      className="flex-1 bg-white"
                      label="Emergency Contact Name"
                      {...register(`emergencyContacts.${index}.name` as const, {
                        required: "Contact name is required",
                      })}
                      {...(isMobile && {
                        slotProps: { inputLabel: { shrink: true } },
                      })}
                      sx={sxTheme("3.25rem")}
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
                      {...(isMobile && {
                        slotProps: { inputLabel: { shrink: true } },
                      })}
                      sx={sxTheme("3.5rem")}
                      error={!!errors.emergencyContacts?.[index]?.phone}
                      helperText={
                        errors.emergencyContacts?.[index]?.phone?.message
                      }
                    />
                  </div>
                  <Box className="flex items-center lg:ml-1 lg:justify-start justify-center flex-row lg:gap-6 gap-12 lg:text-lg text-4xl">
                    <label className="flex items-center lg:gap-4 gap-6">
                      <input
                        type="checkbox"
                        className="lg:w-3 w-6 lg:h-3 h-6 scale-150 accent-blue-600" // Adjust size and color
                        {...register(`emergencyContacts.${index}.notifySMS`)}
                      />
                      <span>Notify via SMS</span>
                    </label>
                    <label className="flex items-center lg:gap-4 gap-6">
                      <input
                        type="checkbox"
                        className="lg:w-3 w-6 lg:h-3 h-6 scale-150 accent-blue-600" // Adjust size and color
                        {...register(`emergencyContacts.${index}.notifyEmail`)}
                      />
                      <span>Notify via Email</span>
                    </label>
                    <Tooltip
                      title="By ticking these boxes, your emergency contact will receive notifications anytime the QR code is scanned."
                      arrow
                    >
                      <InfoIcon
                        fontSize={isMobile ? "large" : "small"}
                        color="action"
                      />
                    </Tooltip>
                  </Box>
                  {contactFields.length > 1 &&
                    (isMobile ? (
                      <Button
                        onClick={() => removeContact(index)}
                        variant="contained"
                        color="error"
                        className="w-fit"
                      >
                        <div className="flex flex-row gap-3 items-end p-4">
                          <DeleteIcon fontSize="large" />
                          <p className="text-2xl">Remove Emergency Contact</p>
                        </div>
                      </Button>
                    ) : (
                      <IconButton
                        onClick={() => removeContact(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    ))}
                </Box>
              ))}
              <Button
                className="flex flex-row lg:gap-1 gap-3"
                onClick={() => appendContact({ name: "", phone: "" })}
              >
                <AddIcon fontSize={isMobile ? "large" : "small"} />
                <p className="lg:text-sm text-4xl">Add Emergency Contact</p>
              </Button>
              <Divider className="pt-12 lg:pt-0" />
              <p className="lg:text-xl text-5xl lg:pt-0 pt-12">
                Insulin Information
              </p>
              {insulinFields.map((field, index) => (
                <Box
                  key={field.id}
                  className="flex flex-col gap-14 lg:bg-white bg-gray-50 lg:flex-row lg:gap-4 w-full lg:border-none border border-gray-300 lg:p-0 p-12 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col lg:flex-1 w-full lg:mt-0 mt-4">
                    <TextField
                      className="flex-1 bg-white"
                      label="Insulin Type"
                      {...register(`insulinTypes.${index}.type`, {
                        required: "Insulin type is required",
                      })}
                      {...(isMobile && {
                        slotProps: { inputLabel: { shrink: true } },
                      })}
                      sx={sxTheme("3.4rem")}
                      error={!!errors.insulinTypes?.[index]?.type}
                      helperText={
                        (errors.insulinTypes?.[index]?.type as FieldError)
                          ?.message
                      }
                    />
                  </div>

                  <div className="flex flex-col lg:flex-1 w-full">
                    <TextField
                      className="flex-1 bg-white"
                      label="Dosage"
                      {...register(`insulinTypes.${index}.dosage` as const, {
                        required: "Dosage is required",
                      })}
                      {...(isMobile && {
                        slotProps: { inputLabel: { shrink: true } },
                      })}
                      sx={sxTheme("3.6rem")}
                      error={!!errors.insulinTypes?.[index]?.dosage}
                      helperText={errors.insulinTypes?.[index]?.dosage?.message}
                    />
                  </div>

                  {insulinFields.length > 1 &&
                    (isMobile ? (
                      <Button
                        onClick={() => removeInsulin(index)}
                        variant="contained"
                        color="error"
                        className="w-fit"
                      >
                        <div className="flex flex-row gap-3 items-end p-4">
                          <DeleteIcon fontSize="large" />
                          <p className="text-2xl">Remove Insulin Entry</p>
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
                </Box>
              ))}
              <Button
                className="flex flex-row lg:gap-1 gap-3"
                onClick={() => appendInsulin({ type: "", dosage: "" })}
              >
                <AddIcon
                  fontSize={isMobile ? "large" : "small"}
                  className="mb-12 lg:mb-0"
                />
                <p className="lg:text-sm text-4xl lg:mb-0 mb-12">
                  Add Insulin Type
                </p>
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
                {...(isMobile && {
                  slotProps: { inputLabel: { shrink: true } },
                })}
                sx={{
                  [theme.breakpoints.down("lg")]: {
                    "& .MuiInputBase-root": {
                      fontSize: "3.15rem",
                      paddingLeft: "1rem",
                    },
                    "& .MuiFormLabel-root": {
                      fontSize: "3rem",
                      marginLeft: "1rem",
                      marginTop: "-1rem",
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                      fontSize: "2rem", // Increase error text size
                    },
                  },
                }}
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

          <Box className="flex justify-between gap-12 lg:pt-4 pt-12 pb-24">
            {activeStep > 0 && (
              <Button
                className="lg:h-fit h-[125px] w-full lg:w-fit rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                type="button"
                variant="outlined"
                onClick={handleBack}
              >
                <p className="text-5xl lg:text-xl">Back</p>
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
              <Button
                className="lg:h-fit h-[125px] w-full lg:w-fit rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                type="submit"
                variant="contained"
                disabled
              >
                <p className="text-5xl lg:text-xl">
                  {isCheckout ? "Submit" : "Save"}
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
  );
};

export default Details;
