import React, { useEffect, useState } from "react";
import { useStoreContext } from '../../utils/GlobalState';
import useDebounce from "../../utils/debounceHook";
import { SEARCH, UPDATE_SEARCH_RESULTS } from '../../utils/actions';
import './style.scss';

function DirectoryControls() {

    const [state, dispatch] = useStoreContext();
    const [search, setSearch] = useState("");

    const debouncedSearchTerm = useDebounce(search, 100);

    const handleInputChange = event => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        // if there is nothing searched...
        if(!search){
            dispatch({
                type: SEARCH,
                searchTerm: ""
            });
            dispatch({
                type: UPDATE_SEARCH_RESULTS,
                searchResults: state.employees
            });
            return;
        }

        if(debouncedSearchTerm){
            // set global search term
            dispatch({
                type: SEARCH,
                searchTerm: debouncedSearchTerm
            });
            // update searched results list
            // const result = words.filter(word => word.length > 6);
            // console.log(debouncedSearchTerm);
            const searchResults = state.employees.filter(employee => {
                return (
                employee.name.first.indexOf(debouncedSearchTerm) > -1 ||
                employee.name.last.indexOf(debouncedSearchTerm) > -1 
                )
            })
            //console.log(searchResults);
            dispatch({
                type: UPDATE_SEARCH_RESULTS,
                searchResults: searchResults
            })

        }
    }, [debouncedSearchTerm, dispatch, search, state.employees]);

    return (
        <div className="d-flex jusitify-content-center">    
            <div className="d-flex justify-content-center">
                <i className="bi bi-search m-2"></i>
                <input className="form-control ml-2" type="text" onChange={handleInputChange} />
            </div>
        </div>
    );

}

export default DirectoryControls;