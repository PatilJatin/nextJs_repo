import { api } from "../apiService";

export const getTopRecentsProjects = async () => {
  try {
    const response = await api.get(`/api/v1/projects/top10recent`);
    console.log(response);
    
    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
};
