import api from "../config/api"

const getAll = async () => {
  const response = await api.get("")
  return response.data
}

const create = async (data) => {
  const response = await api.post("", data)
  return response.data
}

const update = async (id, data) => {
  const response = await api.put(`/${id}`, data)
  return response.data
}

const deleteInternship = async (id) => {
  const response = await api.delete(`/${id}`)
  return response.data
}

export default {
  getAll,
  create,
  update,
  delete: deleteInternship
}

