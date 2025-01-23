import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Profile from "./components/profile/profile";
import { EditProfile } from "./components/profile/edit-profile";
import { Checkout } from "./components/checkout/checkout";
import { LandingPage } from "./components/landing-page/landing-page";
import TermsPage from "./components/footer/terms-and-conditions";
import PrivacyPolicyPage from "./components/footer/privacy-policy";
import Contact from "./components/footer/contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<Checkout />} />
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
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!userId) {
      setError("Invalid request.");
      setLoading(false);
      return;
    }

    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/u/${userId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data.");

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError("Error loading data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>No data found.</p>;

  return <Profile data={userData} />;
};

export default App;
