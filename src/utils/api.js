import axios from "axios";

const CATEGORY_API_BASE_URL = "http://localhost:8080/api/category";

class CategoryBoardsAPI {
    getCategoryBoards(category) {
        return axios.get(CATEGORY_API_BASE_URL + "/" +category); 
    }

    getPersonBlogDetail(name, idx){
        
    }

}

export default new CategoryBoardsAPI();