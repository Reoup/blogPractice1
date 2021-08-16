import axios from "axios";

const CATEGORY_API_BASE_URL = "http://localhost:8080/api/category";

class CategoryBoardsAPI {
    getCategoryBoards(category, p_num) {
        return axios.get(CATEGORY_API_BASE_URL + "/" +category + "?p_num="+ p_num); 
    }

    getPersonBlogDetail(name, idx){
        
    }

}

export default new CategoryBoardsAPI();