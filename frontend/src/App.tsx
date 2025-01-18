import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { useForm } from "react-hook-form";
import Details from "./components/form/details";
import CardPreview from "./components/card/card-preview";

// Main App component
function App() {
  const [qrCode, setQrCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  // Function passed down to child to update parent state
  const handleFieldChange = (name?: string, dob?: string) => {
    setName(name || "");
    setDob(dob || "");
  };

  const onSubmit = async (data: any) => {
    // Using form data for dynamic user data submission
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error creating user:", await response.text());
      return;
    }

    const responseData = await response.json();

    // Generate QR code with both userId and token
    const qrCodeUrl = `http://localhost:5173/info/${responseData.userId}?token=${responseData.token}`;
    setQrCode(qrCodeUrl);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="font-roboto flex flex-row gap-4 justify-center items-center mt-2  px-32">
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
              {/* <h1>Diabetic Emergency Card</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <p>Name is required</p>}
                </div>

                <div>
                  <label>Emergency Contact:</label>
                  <input
                    type="text"
                    placeholder="Emergency Contact Name"
                    {...register("emergencyContact", { required: true })}
                  />
                  {errors.emergencyContact && (
                    <p>Emergency Contact is required</p>
                  )}
                </div>

                <div>
                  <label>Medical Info:</label>
                  <input
                    type="text"
                    placeholder="Medical Information"
                    {...register("medicalInfo", { required: true })}
                  />
                  {errors.medicalInfo && <p>Medical Info is required</p>}
                </div>

                <button type="submit">Generate Emergency Card</button>
              </form> */}

              {qrCode && (
                <div>
                  <h2>
                    Scan this QR code to access the emergency information:
                  </h2>
                  <QRCodeSVG value={qrCode} />
                </div>
              )}
            </div>
          }
        />
      </Routes>

      {/* Define the route for displaying user info */}
      <Routes>
        <Route path="/info/:userId" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

// User Info Component
const UserInfo = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get URL params for userId and token
  const params = new URLSearchParams(window.location.search);
  const userId = window.location.pathname.split("/")[2];
  const token = params.get("token");

  React.useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `http://localhost:5000/users/${userId}?token=${token}`
      );
      if (!response.ok) {
        setError("User not found or invalid token");
        return;
      }
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, [userId, token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Emergency Information</h2>
      <div>
        <strong>Name:</strong> {userData.name}
      </div>
      <div>
        <strong>Emergency Contact:</strong> {userData.emergencyContact}
      </div>
      <div>
        <strong>Medical Information:</strong> {userData.medicalInfo}
      </div>
    </div>
  );
};

export default App;
