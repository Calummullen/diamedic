import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Profile, { ProfileData } from "./components/profile/profile";
import { EditProfile } from "./components/profile/edit-profile";
import { Checkout } from "./components/checkout/checkout";
import { LandingPage } from "./components/landing-page/landing-page";
import TermsPage from "./components/footer/terms-and-conditions";
import PrivacyPolicyPage from "./components/footer/privacy-policy";
import Contact from "./components/footer/contact";
import CheckoutReturnPage from "./components/checkout/return";
import LoadingSpinner from "./components/loading/loading-spinner";
import { Link } from "@mui/material";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/return" element={<CheckoutReturnPage />} />
        <Route path="/:id" element={<UserInfo />} />
        <Route path="/:id/edit-profile" element={<EditProfile />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

const UserInfo = () => {
  const { id: userId } = useParams();
  const [userData, setUserData] = useState<ProfileData>({} as ProfileData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!userId) {
      setError("Invalid request.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/u/${userId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data.");

      const data = await response.json();
      setUserData(data);
    } catch (err: unknown) {
      setError("Error loading data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage text={error} id={userId || "ID not found"} />;
  if (!userData)
    return (
      <ErrorPage text="No user data found" id={userId || "ID not found"} />
    );
  if (!userData.hasPaid)
    return (
      <ErrorPage
        text="Payment has not been made. Please contacr support for assistance."
        id={userId || "ID not found"}
      />
    );

  return <Profile data={userData} />;
};

export default App;

const ErrorPage = ({ text, id }: { text: string; id: string }) => {
  return (
    <div className="flex flex-col gap-4 font-montserrat flex-grow items-center text-center justify-center min-h-[calc(100vh-100px)] bg-white md:mx-0 mx-6">
      <h2 className="text-4xl font-semibold text-gray-800">{text}</h2>
      <p className="text-lg">
        Please contact{" "}
        <Link
          href="mailto:calum@diamedic.co.uk"
          component="a" // 🔥 Forces it to behave like an <a> tag
          variant="h6"
          color="primary"
          underline="hover"
        >
          calum@diamedic.co.uk
        </Link>{" "}
        if the issue continues and quote the below ID.
      </p>
      <p className="text-xl">{id}</p>
    </div>
  );
};
