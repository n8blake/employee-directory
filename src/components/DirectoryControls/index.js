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
            let searchResults;
            let numberStr = "";
            for(let c = 0; c < debouncedSearchTerm.length; c++){
                let cChar = debouncedSearchTerm.charAt(c);
                if( !isNaN(parseInt(cChar))){
                    numberStr = numberStr + debouncedSearchTerm.charAt(c);
                }
            }
            // if searchTerm is a number, search phone numbers
            if(numberStr.length > 0){
                // look through phone numbers
                searchResults = state.employees.filter(employee => {
                    let phoneStr = "";
                    for(let c = 0; c < employee.phone.length; c++){
                        let cChar = employee.phone.charAt(c);
                        if( !isNaN(parseInt(cChar))){
                            phoneStr = phoneStr + employee.phone.charAt(c);
                        }
                    }
                    return (
                        phoneStr.indexOf(numberStr) > -1
                    )
                })
            } else {
                searchResults = state.employees.filter(employee => {
                    return (
                        employee.name.first.toLowerCase().indexOf(debouncedSearchTerm.toLowerCase()) > -1 ||
                        employee.name.last.toLowerCase().indexOf(debouncedSearchTerm.toLowerCase()) > -1 
                    )
                })
            }
            //console.log(searchResults);
            dispatch({
                type: UPDATE_SEARCH_RESULTS,
                searchResults: searchResults
            })

        }
    }, [debouncedSearchTerm, dispatch, search, state.employees, state.searchTerm]);

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