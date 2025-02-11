import { useLocation } from "react-router-dom";
import Details from "../form/details";

export const EditProfile: React.FC = () => {
  const { state } = useLocation();

  return <Details data={state} isCheckout={false} />;
};
