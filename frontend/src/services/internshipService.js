import apiInstance from '../config/api.js'

const internshipService = {
  // Get all internships
  async getAll() {
    try {
      const response = await apiInstance.get('/')
      return response.data
    } catch (error) {
      console.error('Error fetching internships:', error)
      throw error
    }
  },

  // Get single internship by ID
  async getById(id) {
    try {
      const response = await apiInstance.get(`/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching internship:', error)
      throw error
    }
  },

  // Create new internship
  async create(internshipData) {
    try {
      const response = await apiInstance.post('/', internshipData)
      return response.data
    } catch (error) {
      console.error('Error creating internship:', error)
      throw error
    }
  },

  // Update internship
  async update(id, internshipData) {
    try {
      const response = await apiInstance.put(`/${id}`, internshipData)
      return response.data
    } catch (error) {
      console.error('Error updating internship:', error)
      throw error
    }
  },

  // Delete internship
  async delete(id) {
    try {
      const response = await apiInstance.delete(`/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting internship:', error)
      throw error
    }
  }
}

export default internshipService