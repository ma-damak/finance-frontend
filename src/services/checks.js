import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/checks'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getPaginated = async (page, size, search, sort, filter) => {
  const response = await axios.get(
    `${baseUrl}/pagination?page=${page}&size=${size}&search=${search}&sort=${sort}&filter=${filter}`
  )
  return response.data
}

const getById = async (checkId) => {
  const response = await axios.get(`${baseUrl}/${checkId}`)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (checkId, newObject) => {
  const response = await axios.put(`${baseUrl}/${checkId}`, newObject)
  return response.data
}

const deleteCheck = async (checkId) => {
  const response = await axios.delete(`${baseUrl}/${checkId}`)
  return response.data
}

export default {
  getAll,
  getPaginated,
  getById,
  update,
  create,
  deleteCheck,
}
