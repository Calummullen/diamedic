import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import {
  Person,
  Emergency,
  Medication,
  ExpandMore,
  Phone,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import MainLogo from "../../../public/main-logo.png";
import { useIsMobile } from "../../hooks/useIsMobile";
import ConfirmDialog from "../confirm/confirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKitMedical,
  faSyringe,
  faPerson,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import RecoveryPositionModal from "./recovery-position-modal";

interface EmergencyContact {
  name: string;
  phone: string;
  notifySMS?: boolean; // Add notifySMS
}

export interface ProfileData {
  emergencyContacts: EmergencyContact[];
  insulinTypes: { type: string; dosage: string }[];
  name: string;
  email: string;
  dateOfBirth: string;
  emergencyInstructions: string;
  hasPaid: boolean;
  paymentPlaceholder?: string;
  id?: string;
  isUKResident?: boolean;
  termsAccepted?: boolean;
  meta: {
    cardBorderColour: string;
    cardTextColour: string;
    matchBorderColour: boolean;
  };
}

const Profile: React.FC<{ data: ProfileData }> = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the useHistory hook to navigate
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [recoveryOpen, setRecoveryOpen] = useState(false);

  useEffect(() => {
    if (dialogOpen || recoveryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [dialogOpen, recoveryOpen]);

  const handleConfirm = () => {
    setDialogOpen(false);

    // Call Geolocation API
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/send-emergency-sms`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  const handleCancel = () => {
    setDialogOpen(false);
    console.log("User denied location access.");
  };

  const handleEditClick = () => {
    navigate(`/${id}/edit-profile`, { state: { ...data, id } }); // Navigate to edit page
  };

  const calculateAge = (dateOfBirth: string) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // If birth month is after today’s month OR it's the same month but day is later, subtract one year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };
  return (
    <div>
      <ConfirmDialog
        open={dialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        name={data.name}
      />
      <RecoveryPositionModal
        open={recoveryOpen}
        onClose={() => setRecoveryOpen(false)}
      />
      {isMobile ? (
        <div>
          <div className="bg-[#0101ff] flex justify-center py-6">
            <img alt="Main logo" src={MainLogo} height={250} width={250} />
          </div>
          <div className="flex flex-col gap-12 m-4 pb-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl">I'm a Type 1 Diabetic.</h2>
              <h3 className="text-2xl">
                I'm having a severe low blood episode. My{" "}
                <span className="text-red-600 font-bold">
                  Emergency Instructions
                </span>{" "}
                can be found below.
              </h3>
              <h4 className="text-red-600 text-2xl">
                If I'm unconscious, unable to swallow, or experiencing seizures,
                do not attempt to give me food or drink. Call 999 if you haven't
                already, and follow my emergency instructions.
              </h4>
            </div>
            {/* Personal Information */}
            <div className=" p-4 rounded-lg shadow-lg border-t-8 border-blue-600 bg-blue-50">
              <div className="flex flex-row gap-6 items-center mb-4">
                <FontAwesomeIcon
                  icon={faPerson}
                  size="3x"
                  style={{ color: "blue" }}
                />
                <h1 className="text-blue-600 text-4xl">Personal Information</h1>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xl">
                {/* <div className="flex flex-col gap-4"> */}
                <div className="flex flex-row gap-2 text-2xl items-center">
                  <h3 className="text-black">Name:</h3>
                  <h3 className="text-black">{data.name}</h3>
                </div>
                <div className="flex flex-row gap-2 text-2xl items-center">
                  <h3 className="text-black">Age:</h3>
                  <h3 className="text-black">
                    {calculateAge(data.dateOfBirth)}
                  </h3>
                </div>
                <div className="flex flex-row gap-2 text-2xl items-center">
                  <h3 className="text-black">Date of Birth:</h3>
                  <h3 className="text-black">
                    {new Date(data.dateOfBirth).toLocaleDateString()}
                  </h3>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <Alert
              severity="warning"
              icon={
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  size="lg"
                  className="pt-[0.5px]"
                  style={{ color: "orange" }}
                />
              }
              className=""
            >
              <div className="flex flex-col gap-4">
                <h4 className="text-2xl text-black">Quick Instructions</h4>
                <div>
                  <p className="text-xl text-green-600 font-bold">Conscious?</p>
                  <p className="text-lg">
                    Follow my emergency instructions in the below section.
                  </p>
                  <p className="text-lg">
                    Administer something sugary, such as fruit juice, sweets or
                    glucose tablets (please ask if I have these).
                  </p>
                  <p className="text-lg">
                    Wait with me for 10-15 minutes to see if I improve. If not,
                    repeat the above.
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-red-600">Unconscious?</p>
                  <p className="text-lg">
                    Put me into the{" "}
                    <a
                      className="underline cursor-pointer font-bold"
                      onClick={() => setRecoveryOpen(true)}
                    >
                      recovery position
                    </a>
                    .
                  </p>
                  <p className="text-lg">
                    Do NOT give me anything to eat or drink.
                  </p>
                  <p className="text-lg">Call 999.</p>
                </div>
              </div>
            </Alert>

            <div className="rounded-lg shadow-lg border-t-8 border-red-600">
              <Accordion sx={{ boxShadow: "none", backgroundColor: "#fef2f2" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore style={{ fontSize: 50 }} />}
                >
                  <div className="flex flex-row gap-6 items-center">
                    <FontAwesomeIcon
                      icon={faKitMedical}
                      size="2x"
                      style={{ color: "red" }}
                    />
                    <h1 className="text-red-600 text-4xl">
                      Emergency Information
                    </h1>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="flex flex-col gap-2">
                  <h2 className="text-red-600 text-2xl">Emergency Contacts</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {data.emergencyContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="bg-red-50 items-start rounded-lg flex flex-col gap-2"
                      >
                        <h3 className="text-gray-600 text-2xl">
                          {contact.name}
                        </h3>
                        <Button
                          aria-label="Call Emergency Contact"
                          variant="contained"
                          color="error"
                          href={`tel:${contact.phone}`}
                          className=" w-full h-[50px] md:h-[100px] flex items-center justify-between gap-12"
                        >
                          <Phone style={{ fontSize: 30 }} />
                          <p className="text-2xl flex-1 text-center">
                            {contact.phone}
                          </p>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Divider className="pt-2" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl text-red-600">
                      Emergency Instructions
                    </h3>
                    <h4 className="text-xl">
                      In an emergency, follow the below steps:
                    </h4>
                    <h5 className="p-6 border-l-8 border-2 border-red-500 text-black rounded-lg text-2xl">
                      {data.emergencyInstructions}
                    </h5>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>

            {/* Insulin Information */}
            <div className="rounded-lg shadow-lg border-t-8 border-purple-600 bg-purple-50">
              <Accordion sx={{ boxShadow: "none", backgroundColor: "#faf5ff" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore style={{ fontSize: 50 }} />}
                >
                  <div className="flex flex-row gap-6 items-center">
                    <FontAwesomeIcon
                      icon={faSyringe}
                      size="2x"
                      style={{ color: "purple" }}
                    />
                    <h1 className=" text-purple-600 text-4xl">
                      Insulin Information
                    </h1>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex flex-col gap-4">
                    {data.insulinTypes.map((insulin, index) => (
                      <div
                        key={index}
                        className="bg-purple-50 flex flex-col gap-4 rounded-lg border-l-8 p-6 border-2 border-purple-600"
                      >
                        <h3 className="text-black text-3xl font-bold">
                          {insulin.type}
                        </h3>
                        <h3 className="text-2xl text-red-500">
                          Dosage: {insulin.dosage}
                        </h3>
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
            <Button
              aria-label="Edit Profile"
              className="w-full "
              variant="contained"
              color="primary"
              onClick={handleEditClick}
              style={{ textTransform: "none" }}
            >
              <p className="text-4xl">Edit</p>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 my-12 w-[60%] mx-auto">
          <div className="flex flex-col gap-4">
            <Typography variant="h5">I'm a Type 1 Diabetic.</Typography>
            <Typography variant="h5">
              I'm having a severe low blood episode. My{" "}
              <span className="text-red-600 font-bold">
                Emergency Instructions
              </span>{" "}
              can be found below.
            </Typography>
            <Typography variant="h5" className="text-red-600">
              Call 999 if you haven't already, and follow my emergency
              instructions. If I'm unconscious, unable to swallow, or
              experiencing seizures, do not attempt to give me food or drink.
            </Typography>
          </div>
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
            <div className="flex items-center gap-3 mb-4 ">
              <div className="bg-blue-600 text-white p-2 rounded-full">
                <Person />
              </div>
              <Typography variant="h5" className="font-bold">
                Personal Information
              </Typography>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              {/* <div className="flex flex-col gap-4"> */}
              <div>
                <Typography className="text-gray-600 uppercase">
                  Name
                </Typography>
                <Typography variant="h4" className="text-black font-bold">
                  {data.name}
                </Typography>
              </div>
              <div>
                <Typography className="text-gray-600 uppercase">Age</Typography>
                <Typography variant="h6" className="text-lg font-bold">
                  {calculateAge(data.dateOfBirth)}
                </Typography>
              </div>
              <div>
                <Typography className="text-gray-600 uppercase">
                  Date of Birth
                </Typography>
                <Typography variant="h6" className="text-lg font-bold">
                  {new Date(data.dateOfBirth).toLocaleDateString()}
                </Typography>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="rounded-lg shadow-lg border-l-4 border-red-600">
            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 text-white p-2 rounded-full">
                    <Emergency />
                  </div>
                  <Typography variant="h5" className="font-bold text-red-600">
                    Emergency Information
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className="flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {data.emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="p-4 bg-red-50 rounded-lg flex flex-col gap-4"
                    >
                      <Typography className="text-gray-600 font-semibold">
                        {contact.name}
                      </Typography>
                      <Button
                        aria-label={`Call ${contact.name}`}
                        variant="contained"
                        color="error"
                        startIcon={<Phone />}
                        fullWidth
                        href={`tel:${contact.phone}`}
                      >
                        {contact.phone}
                      </Button>
                    </div>
                  ))}
                </div>
                <Divider className="pt-2" />
                <div className="flex flex-col gap-4">
                  <Typography
                    variant="h6"
                    className="mb-2 font-bold text-red-600"
                  >
                    Emergency Instructions
                  </Typography>
                  <Typography className="p-4 border-l-4 border-2 border-red-500 text-black rounded-lg text-lg font-bold">
                    {data.emergencyInstructions}
                  </Typography>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Insulin Information */}
          <div className="rounded-lg shadow-lg border-l-4 border-purple-600">
            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-600 text-white p-2 rounded-full">
                    <Medication />
                  </div>
                  <Typography
                    variant="h5"
                    className="font-bold text-purple-600"
                  >
                    Insulin Information
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-2 gap-4">
                  {data.insulinTypes.map((insulin, index) => (
                    <div
                      key={index}
                      className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400"
                    >
                      <Typography className="text-gray-600 font-semibold">
                        {insulin.type}
                      </Typography>
                      <Typography className="text-lg">
                        Dosage: {insulin.dosage}
                      </Typography>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <Button
            aria-label="edit"
            variant="outlined"
            color="primary"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
