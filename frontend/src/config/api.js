import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://backend-3n91.onrender.com'

const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiInstance
