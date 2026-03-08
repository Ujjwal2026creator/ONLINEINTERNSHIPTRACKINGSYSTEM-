import express from "express";
import {
  createInternship,
  getInternships,
  getInternship,
  updateInternship,
  deleteInternship
} from "../controllers/internshipController.js";

const router = express.Router();

router.post("/", createInternship);
router.get("/", getInternships);
router.get("/:id", getInternship);
router.put("/:id", updateInternship);
router.delete("/:id", deleteInternship);

export default router;
