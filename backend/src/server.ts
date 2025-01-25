import app from "./app";

const PORT = process.env.PORT || 5000;

// Only listen when running locally
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
