import axios from "axios";
import { GET_USER_LIST, GET_REPOSITORY_DETAILS, CLEAN_REPOSITORY_DETAILS, SORT_USER_LIST } from "../actionTypes/actionTypes";

const getUserList = (searchString, userData, total_count) => {
    return {
        type: GET_USER_LIST,
        data: userData,
        total_count: total_count,
        searchString: searchString
    };
}

export const get_user_list = (queryString, items_per_page, page_no = 1) => {
    return dispatch => {
        const url = 'https://api.github.com/search/users?q=' + queryString+ " in:login" + '&page=' + page_no + '&per_page=' + items_per_page;
        axios.get(url)
            .then(res => {
                dispatch(getUserList(queryString, res.data.items, res.data.total_count));
            }, err => {
                console.log(err);
            });
    }
}

const getRepositoryDetails = (repoData) => {
    return {
        type: GET_REPOSITORY_DETAILS,
        data: repoData
    };
}

export const get_repository_details = (username) => {
    return dispatch => {
        const url = 'https://api.github.com/users/' + username + '/repos';
        axios.get(url)
            .then(res => {
                dispatch(getRepositoryDetails(res.data));
            }, err => {
                console.log(err);
            });
    }
}

export const clean_repository_details = () => {
    return {
        type: CLEAN_REPOSITORY_DETAILS
    };
}

export const sort_user_list = (sortBy, direction) => {
    console.log('sortby : ' + sortBy + ' direction : ' + direction);
    return {
        type: SORT_USER_LIST,
        sortBy: sortBy,
        direction: direction
    };
}