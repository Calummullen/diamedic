import { useLocation, useNavigate } from "react-router-dom";
import Details from "../form/details";
import { ProfileData } from "./profile";

export const EditProfile: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); // Initialize the useHistory hook to navigate
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
        navigate(`/${state.id}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return <Details data={state} isCheckout={false} isLoading={false} />;
};
