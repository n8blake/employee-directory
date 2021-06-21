import React, { createContext, useReducer, useContext } from "react";
// import actions
import { SET_VIEW_MODE, UPDATE_EMPLOYEES, LOADING } from "./actions";

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
        viewMode: "table",
        loading: false
    });

    return <Provider value={[state, dispatch]} {...props} />;

};

const useStoreContext = () => {
    return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };
