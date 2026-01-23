import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(token)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default { getAll, create, setToken, update, deleteBlog }