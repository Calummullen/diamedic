import { Request, Response } from "express";
import app from "../src/app";

app.get("/", (req: Request, res) => res.send("Express on Vercel"));

app.listen(5000, () => console.log("Server ready on port 3000."));

module.exports = app;
