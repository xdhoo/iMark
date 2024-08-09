import axios from 'axios'

const API_URL = 'api'
export const getArticles = () => {
  return axios.get(`${API_URL}/articles`)
}

export const getArticle = (id: string) => {
  return axios.get(`${API_URL}/article`, { params: { id } })
}

export const saveArticle = (data) => {
  return axios.post(`${API_URL}/article`, data)
}
