import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";


const getBCategories = async() =>{
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
}

const createBCategory = async(bCategory) =>{
    const response = await axios.post(`${base_url}blogcategory/`, bCategory,config);
    return response.data;
}

const getaBCategory = async (id) => {
    const response = await axios.get(`${base_url}blogcategory/${id}`);
    return response.data;
  };
  
  const updateBCategory = async (bcategory) => {
    const response = await axios.put(
      `${base_url}blogcategory/${bcategory.id}`,
      {
        title: bcategory.bcategoryData.title,
      },
      config
    );
    return response.data;
  };
  
  const deleteBCategory = async (id) => {
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
    return response.data;
  };

const bCategoryService = {
    getBCategories,
    createBCategory,
    getaBCategory,
    updateBCategory,
    deleteBCategory
}
export default bCategoryService;