import ConfirmDialog from "../confirm/confirm";
import { useState } from "react";
import { Header } from "./header";
import { Features } from "./features";
import { HowItWorks } from "./how-it-works";
import { CTA } from "./cta";
import { FAQ } from "./faq";
import { useIsMobile } from "../../hooks/useIsMobile";

export const LandingPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);

  // useEffect(() => {
  //   if (navigator.permissions) {
  //     const getPermission = async () => {
  //       const { state } = await navigator.permissions.query({
  //         name: "geolocation",
  //       });
  //       setDialogOpen(state !== "granted");
  //     };
  //     getPermission();
  //   }
  // }, []);

  const handleConfirm = () => {
    setDialogOpen(false);

    // Call Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location:", position.coords);
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

  return (
    <div className="font-montserrat bg-blue-200">
      <ConfirmDialog
        open={dialogOpen}
        message="We need your location to provide emergency services. Do you want to allow location access?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Header />
      <Features />
      <HowItWorks />
      <CTA />
      <FAQ />
    </div>
  );
};
