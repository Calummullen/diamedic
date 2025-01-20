import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Details from "./components/form/details";
import CardPreview from "./components/card/card-preview";
import Profile from "./components/profile/profile";

function App() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleFieldChange = (name?: string, dob?: string) => {
    setName(name || "");
    setDob(dob || "");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="font-roboto flex flex-row gap-4 justify-center items-center mt-2 px-32">
              <div className="basis-3/5">
                <Details handleFieldChange={handleFieldChange} />
              </div>

              <div className="flex basis-2/5 flex-col gap-8 items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-center">
                  <h3 className="font-bold text-5xl font-macondo">
                    Example card
                  </h3>
                  <p className="font-macondo text-md">
                    Fill out the Full Name and Date of Birth fields to populate
                    the example card
                  </p>
                </div>

                <CardPreview
                  fullName={name}
                  dateOfBirth={dob}
                  backgroundColor={"red"}
                />

                <p className="font-macondo text-md text-red-600">
                  All cards will resemble the preview above, though some text
                  sizes may vary, particularly for longer names.
                </p>
              </div>
            </div>
          }
        />
        <Route path="/info/:id" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

// User Info Component (Fetch User Data from Backend)
// const UserInfo = () => {
//   const { id: userId } = useParams();
//   const urlParams = new URLSearchParams(window.location.search);
//   const token = urlParams.get("token");

//   const [userData, setUserData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("here1", userId);
//     if (!userId) return;

//     fetch(`${import.meta.env.VITE_API_URL}/api/u/${userId}?token=${token}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setUserData(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching user data:", err);
//         setLoading(false);
//       });
//   }, [userId]);

//   if (loading) return <p>Loading...</p>;
//   if (!userData) return <p>Error loading data</p>;

//   return (
//     <div>
//       <Profile data={userData} />
//     </div>
//   );
// };

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
          credentials: "include", // Include cookies in the request
        }
      );

      if (response.status === 401) {
        // Token expired or invalid, attempt token refresh
        const refreshResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/refresh-token`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!refreshResponse.ok) {
          setError("Session expired, please log in again.");
          return;
        }

        // Retry fetching user data after refresh
        response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/u/${userId}`,
          {
            credentials: "include",
          }
        );
      }

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
