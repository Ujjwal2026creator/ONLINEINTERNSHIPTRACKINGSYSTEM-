import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1","8.8.4.4"]);

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/internships", internshipRoutes);

app.get("/", (req, res) => {
  res.send("Internship Tracking Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port${PORT}`),
 console.log(`http://localhost:${PORT}/api/internships`)
);
