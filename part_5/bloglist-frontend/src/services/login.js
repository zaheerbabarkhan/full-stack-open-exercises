import axios from 'axios'

const BASE_URL = '/api/login'

const login = async creds => {
  const response = await axios.post(BASE_URL, creds)
  return response.data
}

export default {
  login
}