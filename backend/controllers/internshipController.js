import Internship from "../models/Internship.js";

// CREATE
export const createInternship = async (req, res) => {
  const internship = await Internship.create(req.body);
  res.json(internship);
};

// READ ALL
export const getInternships = async (req, res) => {
  try {
    const { isPaid, month, year, mentorName } = req.query;
    let query = {};

    // Filter by isPaid (paid/unpaid)
    if (isPaid !== undefined) {
      query.isPaid = isPaid === 'true';
    }

    // Filter by mentorName
    if (mentorName) {
      query.mentorName = { $regex: mentorName, $options: 'i' };
    }

    // Filter by month and year
    if (month || year) {
      const startOfYear = new Date(year || new Date().getFullYear(), 0, 1);
      const endOfYear = new Date((parseInt(year) || new Date().getFullYear()) + 1, 0, 1);

      if (month) {
        const monthNum = parseInt(month) - 1;
        const startDate = new Date(year || new Date().getFullYear(), monthNum, 1);
        const endDate = new Date(parseInt(year) || new Date().getFullYear(), monthNum + 1, 0);
        query.startDate = { $lte: endDate };
        query.endDate = { $gte: startDate };
      } else {
        query.startDate = { $lt: endOfYear };
        query.endDate = { $gte: startOfYear };
      }
    }

    const internships = await Internship.find(query);
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
export const getInternship = async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  res.json(internship);
};

// UPDATE
export const updateInternship = async (req, res) => {
  const internship = await Internship.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(internship);
};

// DELETE
export const deleteInternship = async (req, res) => {
  await Internship.findByIdAndDelete(req.params.id);
  res.json({ message: "Internship record deleted" });
};
