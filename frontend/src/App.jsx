```javascript
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

  useEffect(() => {
    fetchInternships()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, filterCompany, filterType, filterDuration, internships])

  const fetchInternships = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await internshipService.getAll()
      const internshipsData = Array.isArray(data) ? data : []

      setInternships(internshipsData)
      setFilteredInternships(internshipsData)

    } catch (err) {
      setError('Failed to fetch internships')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = internships

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

    if (filterCompany) {
      filtered = filtered.filter(i => i.companyName === filterCompany)
    }

    if (filterType) {
      filtered = filtered.filter(i => i.internshipType === filterType)
    }

    if (filterDuration) {
      filtered = filtered.filter(i => {
        const start = new Date(i.startDate)
        const end = new Date(i.endDate)
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

        if (filterDuration === 'monthly') return months >= 1 && months <= 3
        if (filterDuration === 'yearly') return months > 3

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
      setError('Failed to add internship')
      console.error(err)
    }
  }

  const handleEditInternship = (internship) => {
    setEditingInternship(internship)
  }

  const handleUpdateInternship = async (updatedInternship) => {
    try {
      const data = await internshipService.update(editingInternship._id, updatedInternship)
      setInternships(internships.map(i => i._id === editingInternship._id ? data : i))
      setEditingInternship(null)
    } catch (err) {
      setError('Failed to update internship')
      console.error(err)
    }
  }

  const handleDeleteInternship = async (id) => {
    if (window.confirm('Delete this internship?')) {
      try {
        await internshipService.delete(id)
        setInternships(internships.filter(i => i._id !== id))
      } catch (err) {
        setError('Failed to delete internship')
        console.error(err)
      }
    }
  }

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
              <h2>Add Internship</h2>
              <InternshipForm
                onSubmit={handleAddInternship}
                initialData={null}
                isEditing={false}
              />
            </div>
          </div>
        )}

        {editingInternship && (
          <div className="modal-overlay" onClick={() => setEditingInternship(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Edit Internship</h2>
              <InternshipForm
                onSubmit={handleUpdateInternship}
                initialData={editingInternship}
                isEditing={true}
              />
            </div>
          </div>
        )}

        <div className="filters-section">

          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button onClick={() => setShowAddModal(true)}>
              + Add
            </button>
          </div>

          <div className="filter-controls">

            <select value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}>
              <option value="">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>

            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select value={filterDuration} onChange={(e) => setFilterDuration(e.target.value)}>
              <option value="">All Duration</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

          </div>

        </div>

        {loading ? (
          <div>Loading internships...</div>
        ) : (
          <>
            <p>
              Showing {filteredInternships.length} of {internships.length} internships
            </p>

            <InternshipList
              internships={filteredInternships}
              onDelete={handleDeleteInternship}
              onEdit={handleEditInternship}
            />
          </>
        )}

      </main>

      <footer className="app-footer">
        <p>© 2026 Internship Tracker</p>
      </footer>

    </div>
  )
}

export default App
```
