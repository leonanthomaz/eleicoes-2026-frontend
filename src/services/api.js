// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/eleicoes',
  timeout: 15000,
});

export const eleicoesApi = {
  health: () => api.get('/health').then(r => r.data),
  configuracao: () => api.get('/2026/configuracao').then(r => r.data),

  presidente: (params) =>
    api.get('/2026/presidente', { params }).then(r => r.data),
  governadorRJ: () =>
    api.get('/2026/governador/rj').then(r => r.data),
  senadorRJ: () =>
    api.get('/2026/senador/rj').then(r => r.data),
  deputadoFederalRJ: () =>
    api.get('/2026/deputado-federal/rj').then(r => r.data),
  deputadoEstadualRJ: () =>
    api.get('/2026/deputado-estadual/rj').then(r => r.data),
};

export default api;