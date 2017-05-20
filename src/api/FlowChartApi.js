import axios from 'axios'
import { getAuthToken } from './AuthApi'
import { apiBaseUrl } from '../utils/config'

export function fetchFlowChart (id) {
  return axios.get(`${apiBaseUrl()}/flow_charts/${id}`, headers())
}

export function fetchFlowCharts () {
  return axios.get(`${apiBaseUrl()}/flow_charts`, headers())
}

export function createFlowChart (params) {
  return axios.post(`${apiBaseUrl()}/flow_charts`, {
    flow_chart: params
  }, headers())
}

export function saveFlowChart (id, params) {
  return axios.put(`${apiBaseUrl()}/flow_charts/${id}`, {
    flow_chart: params
  }, headers())
}

export function deleteFlowChart (id) {
  return axios.delete(`${apiBaseUrl()}/flow_charts/${id}`, headers())
}

function headers () {
  return { headers: { Authorization: `Bearer ${getAuthToken()}` } }
}
