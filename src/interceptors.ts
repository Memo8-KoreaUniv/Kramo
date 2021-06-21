import axios from 'axios'

const kaxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVICE_URL}/api`,
  timeout: 15000,
  withCredentials: true,
})

kaxios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

kaxios.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
    return Promise.reject(error)
  },
)

export default kaxios
