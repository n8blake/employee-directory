import React, { createContext, useReducer, useContext } from "react";
// import actions
import { SET_VIEW_MODE, UPDATE_EMPLOYEES, SEARCH, UPDATE_SEARCH_RESULTS, LOADING } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
    // switch on action type
    switch(action.type){
        case SET_VIEW_MODE:
            return {
                ...state,
                viewMode: action.viewMode,
                loading: false
            }
        case UPDATE_EMPLOYEES:
            return {
                ...state,
                employees: [...action.employees],
                loading: false
            }
        case SEARCH:
            return {
                ...state,
                searchTerm: action.searchTerm
            }
        case UPDATE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: [...action.searchResults]
            }
        case LOADING: 
            return {
                ...state,
                loading: true
            }
        default: 
            return state;
    }
}

const StoreProvider = ({value = [], ...props}) => {
    const [state, dispatch] = useReducer(reducer, {
        employees: [],
        activeEmployee: {},
        viewMode: "AZ",
        searchTerm: "",
        searchResults: [],
        loading: false
    });

    return <Provider value={[state, dispatch]} {...props} />;

};

const useStoreContext = () => {
    return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };
