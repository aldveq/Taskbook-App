import { authTypes } from "../utilities/constants";

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case authTypes.login:
            return {
                ...action.payload,
                logged: true
            }
        case authTypes.logout:
            return {
                logged: false
            }    
        default:
            return state;
    }
}

export {authReducer};
