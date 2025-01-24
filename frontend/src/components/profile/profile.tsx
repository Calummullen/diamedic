import React from "react";
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

interface EmergencyContact {
  name: string;
  phone: string;
  notifySMS?: boolean; // Add notifySMS
  notifyEmail?: boolean; // Add notifyEmail
}

export interface ProfileData {
  emergencyContacts: EmergencyContact[];
  insulinTypes: { type: string; dosage: string }[];
  name: string;
  age: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  postcode: string;
  emergencyInstructions: string;
  paymentPlaceholder?: string;
  id?: string;
}

const Profile: React.FC<{ data: ProfileData }> = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the useHistory hook to navigate

  const handleEditClick = () => {
    navigate(`/${id}/edit-profile`, { state: { ...data, id } }); // Navigate to edit page
  };
  return (
    <div className="flex flex-col gap-8 mx-4">
      <Button variant="outlined" color="primary" onClick={handleEditClick}>
        Edit
      </Button>
      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-8 border-blue-600">
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
            <Typography className="text-gray-600 uppercase">Name</Typography>
            <Typography variant="h4" className="text-gray-900 font-bold">
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
      <div className="rounded-lg shadow-lg border-l-8 border-red-600">
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
              <Typography variant="h6" className="mb-2 font-bold text-red-600">
                Emergency Instructions
              </Typography>
              <Typography className="p-4 border-l-8 border-2 border-red-500 text-black rounded-lg text-lg font-bold">
                {data.emergencyInstructions}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Address */}
      <div className="rounded-lg shadow-lg border-l-8 border-green-600">
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
              <Typography className="text-lg">{data.addressLine2}</Typography>
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
      <div className="rounded-lg shadow-lg border-l-8 border-purple-600">
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 text-white p-2 rounded-full">
                <Medication />
              </div>
              <Typography variant="h5" className="font-bold text-purple-600">
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
    </div>
  );
};

export default Profile;
