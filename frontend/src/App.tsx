import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            </div>
          }
        />
      </Routes>

      <Routes>
        <Route path="/info" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

// User Info Component
const UserInfo = () => {
  // Get URL params for userId and token
  const params = new URLSearchParams(window.location.search);
  const data = JSON.parse(params.get("data") || "");
  console.log("data", data);

  return (
    <div>
      <Profile data={data} />
    </div>
  );
};

export default App;
