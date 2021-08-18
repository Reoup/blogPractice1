import axios from "axios";

const CATEGORY_API_BASE_URL = "http://localhost:8080/api";

class CategoryBoardsAPI {
    getCategoryBoards(category, p_num) {
        return axios.get(CATEGORY_API_BASE_URL + "/category/" + category + "?p_num=" + p_num);
    }

    BlogBoardsHitUp(idx) {
        return axios.put(CATEGORY_API_BASE_URL + "/" + idx)
    }

    getPersonBlogDetail(name, idx) {
        return axios.get(CATEGORY_API_BASE_URL + "/" + name + "/" + idx);
    }
}

export default new CategoryBoardsAPI();