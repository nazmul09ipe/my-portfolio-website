import api from './api';

export const fetchSkills = async () => {
  const { data } = await api.get('/skills');
  return data.data;
};
