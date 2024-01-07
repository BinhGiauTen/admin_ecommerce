import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getPCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

const createPCategory = async (pCategory) => {
  const response = await axios.post(`${base_url}category/`, pCategory, config);
  return response.data;
};

const getaPCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`);
  return response.data;
};

const updatePCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.categoryData.title },
    config
  );
  return response.data;
};

const deletePCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const pCategoryService = {
  getPCategories,
  createPCategory,
  getaPCategory,
  updatePCategory,
  deletePCategory
};
export default pCategoryService;
