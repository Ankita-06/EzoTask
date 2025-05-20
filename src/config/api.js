import axios from 'axios';

const BASE_URL = 'https://randomuser.me/api/';

export const fetchUsers = async (page = 1, results = 10) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { page, results },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
