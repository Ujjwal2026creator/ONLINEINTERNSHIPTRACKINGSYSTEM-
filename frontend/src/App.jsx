import React, { useState, useEffect } from 'react'
import InternshipForm from './components/InternshipForm'
import InternshipList from './components/InternshipList'
import internshipService from './services/internshipService'
import './styles/App.css'

function App() {
  const [internships, setInternships] = useState([])
  const [filteredInternships, setFilteredInternships] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCompany, setFilterCompany] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterDuration, setFilterDuration] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingInternship, setEditingInternship] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch internships on component mount
  useEffect(() => {
    fetchInternships()
  }, [])

  // Apply filters whenever search or filter values change
  useEffect(() => {
    applyFilters()
  }, [searchTerm, filterCompany, filterType, filterDuration, internships])
  
const fetchInternships = async () => {
  try {
    setLoading(true)
    setError('')
    const data = await internshipService.getAll()

    // Ensure internships is always an array
    setInternships(Array.isArray(data) ? data : [])

  } catch (err) {
    setError('Failed to fetch internships')
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  const applyFilters = () => {
    let filtered = internships

    // Search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        internship =>
          internship.internshipRole?.toLowerCase().includes(search) ||
          internship.companyName?.toLowerCase().includes(search) ||
          internship.studentName?.toLowerCase().includes(search) ||
          internship.mentorName?.toLowerCase().includes(search)
      )
    }

    // Company filter
    if (filterCompany) {
      filtered = filtered.filter(internship => internship.companyName === filterCompany)
    }

    // Type filter
    if (filterType) {
      filtered = filtered.filter(internship => internship.internshipType === filterType)
    }

    // Duration filter (Monthly or Yearly based)
    if (filterDuration) {
      filtered = filtered.filter(internship => {
        const start = new Date(internship.startDate)
        const end = new Date(internship.endDate)
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
        
        if (filterDuration === 'monthly') {
          return months >= 1 && months <= 3
        } else if (filterDuration === 'yearly') {
          return months > 3
        }
        return true
      })
    }

    setFilteredInternships(filtered)
  }

  const handleAddInternship = async (newInternship) => {
    try {
      const data = await internshipService.create(newInternship)
      setInternships([...internships, data])
      setShowAddModal(false)
      setError('')
    } catch (err) {
      setError('Failed to add internship: ' + (err.response?.data?.message || err.message))
      console.error(err)
    }
  }

  const handleEditInternship = (internship) => {
    setEditingInternship(internship)
    setShowForm(true)
  }

  const handleUpdateInternship = async (updatedInternship) => {
    if (!editingInternship) return
    
    try {
      const data = await internshipService.update(editingInternship._id, updatedInternship)
      setInternships(internships.map(i => i._id === editingInternship._id ? data : i))
      setEditingInternship(null)
      setError('')
    } catch (err) {
      setError('Failed to update internship: ' + (err.response?.data?.message || err.message))
      console.error(err)
    }
  }

  const handleDeleteInternship = async (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await internshipService.delete(id)
        setInternships(internships.filter(internship => internship._id !== id))
        setError('')
      } catch (err) {
        setError('Failed to delete internship')
        console.error(err)
      }
    }
  }

  // Get unique companies and types for filter dropdowns
  const companies = [...new Set(internships.map(i => i.companyName).filter(Boolean))]
  const types = ['Paid', 'Unpaid']

  return (
    <div className="app">
      <header className="app-header">
        <h1>Internship Tracker</h1>
        <p>Manage and track your internship opportunities</p>
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Internship</h2>
                <button 
                  className="modal-close"
                  onClick={() => setShowAddModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <InternshipForm 
                  onSubmit={handleAddInternship}
                  initialData={null}
                  isEditing={false}
                />
              </div>
            </div>
          </div>
        )}

        {editingInternship && (
          <div className="modal-overlay" onClick={() => {
            setEditingInternship(null)
          }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Internship</h2>
                <button 
                  className="modal-close"
                  onClick={() => {
                    setEditingInternship(null)
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <InternshipForm 
                  onSubmit={handleUpdateInternship}
                  initialData={editingInternship}
                  isEditing={true}
                />
              </div>
            </div>
          </div>
        )}

        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by role, company, student, or mentor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button
              className="btn btn-primary btn-add-quick"
              onClick={() => setShowAddModal(true)}
            >
              + Add
            </button>
          </div>

          <div className="filter-controls">
            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="filter-select"
            >
              <option value="">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={filterDuration}
              onChange={(e) => setFilterDuration(e.target.value)}
              className="filter-select"
            >
              <option value="">All Durations</option>
              <option value="monthly">Monthly Based</option>
              <option value="yearly">Yearly Based</option>
            </select>

            {(searchTerm || filterCompany || filterType || filterDuration) && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('')
                  setFilterCompany('')
                  setFilterType('')
                  setFilterDuration('')
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading internships...</div>
        ) : (
          <>
            <div className="results-info">
              Showing {filteredInternships.length} of {internships.length} internships
            </div>
            <InternshipList
              internships={filteredInternships}
              onDelete={handleDeleteInternship}
              onEdit={handleEditInternship}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Internship Tracker. Manage your career opportunities effectively.</p>
      </footer>
    </div>
  )
}

export default App
