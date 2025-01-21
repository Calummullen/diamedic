import { useState } from "react";
import CardPreview from "../card/card-preview";
import Details from "../form/details";
import { ProfileData } from "../profile/profile";

export const Checkout: React.FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleFieldChange = (name?: string, dob?: string) => {
    setName(name || "");
    setDob(dob || "");
  };

  const onSubmit = async (formData: ProfileData) => {
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

      if (data.qrCode) {
        // setQrCode(data.qrCode);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="font-roboto flex flex-row gap-4 justify-center items-center mt-2 px-32">
      <div className="basis-3/5">
        <Details
          handleFieldChange={handleFieldChange}
          onSubmit={onSubmit}
          data={
            {
              emergencyContacts: [{ name: "", phone: "" }],
              insulinTypes: [{ type: "", dosage: "" }],
            } as ProfileData
          }
        />
      </div>

      <div className="flex basis-2/5 flex-col gap-8 items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className="font-bold text-5xl font-macondo">Example card</h3>
          <p className="font-macondo text-md">
            Fill out the Full Name and Date of Birth fields to populate the
            example card
          </p>
        </div>

        <CardPreview
          fullName={name}
          dateOfBirth={dob}
          backgroundColor={"red"}
        />

        <p className="font-macondo text-md text-red-600">
          All cards will resemble the preview above, though some text sizes may
          vary, particularly for longer names.
        </p>
      </div>
    </div>
  );
};
