import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import {
  Person,
  Home,
  Emergency,
  Medication,
  ExpandMore,
  Phone,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import MainLogo from "../../../public/main-logo.png";
import { useIsMobile } from "../../hooks/useIsMobile";
import ConfirmDialog from "../confirm/confirm";

interface EmergencyContact {
  name: string;
  phone: string;
  notifySMS?: boolean; // Add notifySMS
}

export interface ProfileData {
  emergencyContacts: EmergencyContact[];
  insulinTypes: { type: string; dosage: string }[];
  name: string;
  age: string;
  email: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  postcode: string;
  emergencyInstructions: string;
  hasPaid: boolean;
  paymentPlaceholder?: string;
  id?: string;
  meta: {
    cardBorderColour: string;
    cardTextColour: string;
    matchBorderColor: boolean;
  };
}

const Profile: React.FC<{ data: ProfileData }> = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the useHistory hook to navigate
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(true);

  useEffect(() => {
    if (dialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [dialogOpen]);

  const handleConfirm = () => {
    setDialogOpen(false);

    // Call Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Don't need to await, fire and forget
        fetch(`${import.meta.env.VITE_API_URL}/api/send-emergency-sms`, {
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
  return (
    <div>
      <ConfirmDialog
        open={dialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        name={data.name}
      />
      {isMobile ? (
        <div className="font-montserrat">
          <div className="bg-[#0101ff] flex justify-center py-6">
            <img src={MainLogo} height={250} width={250} />
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
                Call 999 if you haven't already, and follow my emergency
                instructions. If I'm unconscious, unable to swallow, or
                experiencing seizures, do not attempt to give me food or drink.
              </h4>
            </div>
            {/* Personal Information */}
            <div className=" p-4 rounded-lg shadow-lg border-l-4 border-blue-600 bg-blue-50">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-blue-600 text-4xl">Personal Information</h1>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xl">
                {/* <div className="flex flex-col gap-4"> */}
                <div className="flex flex-row gap-2 items-center">
                  <h3 className="text-black">Name:</h3>
                  <h3 className="text-black">{data.name}</h3>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <h3 className="text-black">Age:</h3>
                  <h3 className="text-black">{data.age}</h3>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <h3 className="text-black">Date of Birth:</h3>
                  <h3 className="text-black">
                    {new Date(data.dateOfBirth).toLocaleDateString()}
                  </h3>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}

            <div className="rounded-lg shadow-lg border-l-4 border-red-600">
              <Accordion sx={{ boxShadow: "none", backgroundColor: "#fef2f2" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore style={{ fontSize: 50 }} />}
                >
                  <div className="flex items-center">
                    <h1 className="text-red-600 text-4xl">
                      Emergency Information
                    </h1>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="flex flex-col gap-2">
                  <h2 className="text-red-600 text-xl">Emergency Contacts</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {data.emergencyContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="bg-red-50 items-start rounded-lg flex flex-col gap-1"
                      >
                        <h3 className="text-gray-600 text-2xl">
                          {contact.name}
                        </h3>
                        <Button
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
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl text-red-600">
                      Emergency Instructions
                    </h3>
                    <h4 className="p-2 border-l-4 border-[1px] border-red-500 text-black rounded-lg">
                      {data.emergencyInstructions}
                    </h4>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>

            {/* Insulin Information */}
            <div className="rounded-lg shadow-lg border-l-4 border-purple-600 bg-purple-50">
              <Accordion sx={{ boxShadow: "none", backgroundColor: "#faf5ff" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore style={{ fontSize: 50 }} />}
                >
                  <div className="flex items-center gap-3">
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
                        className="bg-purple-50 rounded-lg border-l-4 py-4 px-2 border-[1px] border-purple-600"
                      >
                        <h3 className="text-black text-2xl">
                          Name: {insulin.type}
                        </h3>
                        <h3 className="text-2xl">Dosage: {insulin.dosage}</h3>
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
            <Button
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
        <div className="flex font-montserrat flex-col gap-8 my-12 w-[60%] mx-auto">
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
                  {data.age}
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

          {/* Address */}
          <div className="rounded-lg shadow-lg border-l-4 border-green-600">
            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <Home />
                  </div>
                  <Typography variant="h5" className="font-bold text-green-600">
                    Address
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-lg">{data.addressLine1}</Typography>
                {data.addressLine2 && (
                  <Typography className="text-lg">
                    {data.addressLine2}
                  </Typography>
                )}
                <Typography className="text-lg">{data.city}</Typography>
                {data.county && (
                  <Typography className="text-lg">{data.county}</Typography>
                )}
                <Typography className="text-lg font-semibold">
                  {data.postcode}
                </Typography>
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
          <Button variant="outlined" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
