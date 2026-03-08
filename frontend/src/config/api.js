import axios from "axios"

const api = axios.create({
  baseURL: "https://backend-3n91.onrender.com/api/internships",
})

export default api
