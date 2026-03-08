import React, { useState, useEffect } from 'react'
import { formatDateForInput } from '../utils/dateUtils'

function InternshipForm({ onSubmit, initialData, isEditing }) {
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    companyName: '',
    internshipRole: '',
    internshipType: 'Paid',
    startDate: '',
    endDate: '',
    mentorName: '',
    isPaid: false
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        studentName: initialData.studentName || '',
        studentEmail: initialData.studentEmail || '',
        companyName: initialData.companyName || '',
        internshipRole: initialData.internshipRole || '',
        internshipType: initialData.internshipType || 'Paid',
        startDate: formatDateForInput(initialData.startDate),
        endDate: formatDateForInput(initialData.endDate),
        mentorName: initialData.mentorName || '',
        isPaid: initialData.isPaid || false
      })
    }
  }, [isEditing, initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required'
    }
    if (!formData.studentEmail.trim() || !formData.studentEmail.includes('@')) {
      newErrors.studentEmail = 'Valid email is required'
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    if (!formData.internshipRole.trim()) {
      newErrors.internshipRole = 'Internship role is required'
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    if (!formData.mentorName.trim()) {
      newErrors.mentorName = 'Mentor name is required'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)

    // Reset form
    setFormData({
      studentName: '',
      studentEmail: '',
      companyName: '',
      internshipRole: '',
      internshipType: 'Paid',
      startDate: '',
      endDate: '',
      mentorName: '',
      isPaid: false
    })
    setErrors({})
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="studentName">Student Name *</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            className={errors.studentName ? 'input-error' : ''}
          />
          {errors.studentName && <span className="error-text">{errors.studentName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="studentEmail">Email *</label>
          <input
            type="email"
            id="studentEmail"
            name="studentEmail"
            value={formData.studentEmail}
            onChange={handleChange}
            placeholder="e.g., john@example.com"
            className={errors.studentEmail ? 'input-error' : ''}
          />
          {errors.studentEmail && <span className="error-text">{errors.studentEmail}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g., Google"
            className={errors.companyName ? 'input-error' : ''}
          />
          {errors.companyName && <span className="error-text">{errors.companyName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="internshipRole">Internship Role *</label>
          <input
            type="text"
            id="internshipRole"
            name="internshipRole"
            value={formData.internshipRole}
            onChange={handleChange}
            placeholder="e.g., Software Engineering Intern"
            className={errors.internshipRole ? 'input-error' : ''}
          />
          {errors.internshipRole && <span className="error-text">{errors.internshipRole}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="internshipType">Internship Type *</label>
          <select
            id="internshipType"
            name="internshipType"
            value={formData.internshipType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mentorName">Mentor Name *</label>
          <input
            type="text"
            id="mentorName"
            name="mentorName"
            value={formData.mentorName}
            onChange={handleChange}
            placeholder="e.g., Sarah Smith"
            className={errors.mentorName ? 'input-error' : ''}
          />
          {errors.mentorName && <span className="error-text">{errors.mentorName}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start Date *</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={errors.startDate ? 'input-error' : ''}
          />
          {errors.startDate && <span className="error-text">{errors.startDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date *</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={errors.endDate ? 'input-error' : ''}
          />
          {errors.endDate && <span className="error-text">{errors.endDate}</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-submit">
        {isEditing ? 'Update Internship' : 'Add Internship'}
      </button>
    </form>
  )
}

export default InternshipForm
