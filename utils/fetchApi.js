import axios from "axios";

export const baseUrl = 'http://localhost:3100/api/v1/products/';

export const fetchApi = async (url) => {
    const { data } = await axios.get((url));

    return data;
};

export const deleteProduct = async (id) => {
    axios.delete(`${baseUrl}/todos/${id}`)
};

export const updateProduct = async ( id, data ) => {
  axios.patch(`${baseUrl}/todos/${id}`, data)
};
