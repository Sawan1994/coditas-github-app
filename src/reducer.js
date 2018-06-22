import { GET_USER_LIST, GET_REPOSITORY_DETAILS, CLEAN_REPOSITORY_DETAILS, SORT_USER_LIST } from "./store/actionTypes/actionTypes";

const initialState = {
    userData: [],
    repoData: [],
    pagination: {
        items_per_page: 30
    },
    totalUsers: 0,
    searchString: ''
};

export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_USER_LIST:
            let temp = { ...state };
            temp.userData = [...action.data];
            temp.totalUsers = action.total_count;
            temp.searchString = action.searchString;
            return temp;

        case GET_REPOSITORY_DETAILS:
            temp = { ...state };
            temp.repoData = [...action.data];
            return temp;

        case CLEAN_REPOSITORY_DETAILS:
            temp = { ...state };
            temp.repoData = [];
            return temp;

        case SORT_USER_LIST:
            temp = { ...state };
            let userData = [...temp.userData];
            if (action.sortBy === 'name') {
                if (action.direction === 'asc') {
                    userData = sortByNameAsc(userData);
                } else if (action.direction === 'desc') {
                    userData = sortByNameDesc(userData);
                }
            } else if (action.sortBy === 'rank') {
                if (action.direction === 'asc') {
                    userData = sortByRankAsc(userData);
                } else if (action.direction === 'desc') {
                    userData = sortByRankDesc(userData);
                }
            }

            temp.userData = [...userData];
            return temp;

        default: return state;
    }
}

const sortByNameAsc = (userData) => {
    userData.sort((a, b) => {
        var nameA = a.login.toLowerCase(), nameB = b.login.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0
    });
    return userData;
}

const sortByNameDesc = (userData) => {
    userData.sort((a, b) => {
        var nameA = a.login.toLowerCase(), nameB = b.login.toLowerCase()
        if (nameA > nameB) //sort string descending
            return -1
        if (nameA < nameB)
            return 1
        return 0
    });
    return userData;
}
const sortByRankAsc = (userData) => {
    userData.sort((a, b) => {
        var scoreA = a.score, scoreB = b.score;
        if (scoreA < scoreB) //sort string ascending
            return -1
        if (scoreA > scoreB)
            return 1
        return 0
    });
    return userData;
}

const sortByRankDesc = (userData) => {
    userData.sort((a, b) => {
        var scoreA = a.score, scoreB = b.score;
        if (scoreA > scoreB) //sort string ascending
            return -1
        if (scoreA < scoreB)
            return 1
        return 0
    });
    return userData;
}
