import { useLocation } from "react-router-dom";
import Details from "../form/details";
import { ProfileData } from "./profile";

export const EditProfile: React.FC = () => {
  const { state } = useLocation();
  console.log(state);

  const onSubmit = async (formData: ProfileData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${formData?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Details
      handleFieldChange={() => {}}
      onSubmit={onSubmit}
      data={state}
      isCheckout={false}
    />
  );
};
