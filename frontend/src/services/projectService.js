import api from './api';

export const fetchProjects = async (featured = false) => {
  const params = featured ? { featured: 'true' } : {};
  const { data } = await api.get('/projects', { params });
  return data.data;
};

export const fetchProjectById = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data.data;
};
