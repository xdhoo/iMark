import axios from 'axios'
import type { Article, Note } from '../../types'
import conf from '@/conf'

const API_URL = conf.API_URL
export const getArticles = () => {
  return axios.get(`${API_URL}/articles`)
}

export const getArticle = (id: string) => {
  return axios.get(`${API_URL}/article`, { params: { id } })
}

export const saveArticle = (data: Article) => {
  return axios.post(`${API_URL}/article`, data)
}

export const addNote = (data: { id: string; note: Note }) => {
  return axios.post(`${API_URL}/add_note`, data)
}

export const getRecords = (type: string) => {
  return axios.post(`${API_URL}/records`, { type })
}

export const saveRecord = (params: { type: string; date: string }) => {
  return axios.post(`${API_URL}/record`, params)
}
