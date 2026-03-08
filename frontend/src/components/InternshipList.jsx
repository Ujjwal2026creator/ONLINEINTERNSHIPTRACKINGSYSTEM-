function InternshipList({ internships, onDelete, onEdit }) {

  if (!Array.isArray(internships) || internships.length === 0) {
    return (
      <div className="empty-state">
        <p>No internships found. Start by adding a new one!</p>
      </div>
    )
  }

  return (
    <div className="internships-grid">
      {Array.isArray(internships) && internships.map((internship) => (
        <div key={internship._id} className="internship-card-compact">
