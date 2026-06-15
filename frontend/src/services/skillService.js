export const fetchSkills = async () => {
  const res = await api.get('/skills');

  console.log("Skills API response:", res.data);

  return res.data.data || res.data.skills || res.data;
};