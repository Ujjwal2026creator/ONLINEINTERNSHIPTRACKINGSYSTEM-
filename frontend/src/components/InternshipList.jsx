import React from 'react'

function InternshipList({ internships, onDelete }) {
  if (internships.length === 0) {
    return (
      <div className="empty-state">
        <p>No internships found. Start by adding a new one!</p>
      </div>
    )
  }

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    return months > 0 ? `${months}` : '0'
  }

  return (
    <div className="internships-grid">
      {internships.map(internship => (
        <div key={internship._id} className="internship-card-compact">
          <div className="card-header-compact">
            <h3 className="position-compact">{internship.internshipRole}</h3>
            <button
              className="btn-delete-compact"
              onClick={() => onDelete(internship._id)}
              title="Delete internship"
            >
              Delete
            </button>
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
              <div className={`box-value type-badge ${internship.internshipType.toLowerCase()}`}>
                {internship.internshipType}
              </div>
            </div>

            <div className="info-box">
              <div className="box-label">Duration</div>
              <div className="box-value">{calculateDuration(internship.startDate, internship.endDate)} month(s)</div>
            </div>

            <div className="info-box">
              <div className="box-label">Start</div>
              <div className="box-value">
                {new Date(internship.startDate).toLocaleDateString()}
              </div>
            </div>

            <div className="info-box">
              <div className="box-label">End</div>
              <div className="box-value">
                {new Date(internship.endDate).toLocaleDateString()}
              </div>
            </div>

            <div className="info-box">
              <div className="box-label">Status</div>
              <div className={`box-value ${internship.isPaid ? 'paid-status' : 'unpaid-status'}`}>
                {internship.isPaid ? 'Paid' : 'Unpaid'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InternshipList
