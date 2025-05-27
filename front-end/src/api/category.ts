import API_ENDPOINTS from "./endpoint";
import axiosInstance from "./axios";

export async function getCategories(){
    const response = await axiosInstance.get(API_ENDPOINTS.BOOK.CATEGORY);
    if(response.status !== 200){
        throw new Error("Failed to fetch categories");
    }
    return response.data.result.categoryResponseDTOs.children;
}
export async function getGenre(){
    const response = await axiosInstance.get(API_ENDPOINTS.BOOK.CATEGORY);
    if(response.status !== 200){
        throw new Error("Failed to fetch genres");
    }
    return response.data.result.genreResponseDTOs;
}