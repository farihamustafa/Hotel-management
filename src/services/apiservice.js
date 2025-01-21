import axiosInstance from './axiosInstance';

class ApiService {
  // GET request
  async getData(endpoint) {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('API GET Error: ', error);
      throw error;  // Rethrow to handle in the component
    }
  }

  // POST request
  async postData(endpoint, data) {
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('API POST Error: ', error);
      throw error;
    }
  }

  // PUT request
  async putData(endpoint, data) {
    try {
      const response = await axiosInstance.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('API PUT Error: ', error);
      throw error;
    }
  }

  // DELETE request
  async deleteData(endpoint) {
    try {
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error('API DELETE Error: ', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();