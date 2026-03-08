import React from "react"
import { calculateDurationInMonths, formatDate } from "../utils/dateUtils"

function InternshipList({ internships = [], onDelete, onEdit }) {

  if (internships.length === 0) {
    return (
      <div className="empty-state">
        <p>No internships found. Start by adding a new one!</p>
      </div>
    )
  }

  const calculateDuration = (startDate, endDate) => {
    return calculateDurationInMonths(startDate, endDate)
  }

  return (
    <div className="internships-grid">
      {internships.map((internship) => (
        <div key={internship._id} className="internship-card-compact">

          <div className="card-header-compact">
            <h3 className="position-compact">{internship.internshipRole}</h3>

            <div className="button-group">
              <button
                className="btn-edit-compact"
                onClick={() => onEdit(internship)}
              >
                Edit
              </button>

              <button
                className="btn-delete-compact"
                onClick={() => onDelete(internship._id)}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="info-boxes">

            <div className="info-box">
              <div className="box-label">Student</div>
              <div className="box-value">{internship.studentName}</div>
            </div>

            <div className="info-box">
              <div className="box-label">Email</div>
              <div className="box-value email">{internship.studentEmail}</div>
            </div>

            <div className="info-box">
              <div className="box-label">Company</div>
              <div className="box-value">{internship.companyName}</div>
            </div>

            <div className="info-box">
              <div className="box-label">Mentor</div>
              <div className="box-value">{internship.mentorName}</div>
            </div>

            <div className="info-box">
              <div className="box-label">Type</div>
              <div className={`box-value type-badge ${internship.internshipType?.toLowerCase()}`}>
                {internship.internshipType}
              </div>
            </div>

            <div className="info-box">
              <div className="box-label">Duration</div>
              <div className="box-value">
                {calculateDuration(internship.startDate, internship.endDate)} month(s)
              </div>
            </div>

            <div className="info-box">
              <div className="box-label">Start</div>
              <div className="box-value">
                {formatDate(internship.startDate)}
              </div>
            </div>

            <div className="info-box">
              <div className="box-label">End</div>
              <div className="box-value">
                {formatDate(internship.endDate)}
              </div>
            </div>

          </div>

        </div>
      ))}
    </div>
  )
}

export default InternshipList
