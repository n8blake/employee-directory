import React, { useEffect, useState } from "react";
import { useStoreContext } from '../../utils/GlobalState';
import useDebounce from "../../utils/debounceHook";
import { SET_VIEW_MODE, LOADING, SEARCH, UPDATE_SEARCH_RESULTS } from '../../utils/actions';
import './style.scss';

function DirectoryControls() {

    const [state, dispatch] = useStoreContext();
    const [search, setSearch] = useState("");

    const debouncedSearchTerm = useDebounce(search, 500);

    const setListView = () => {
        dispatch({type: SET_VIEW_MODE, viewMode: "list"})
    }

    const setTableView = () => {
        dispatch({type: SET_VIEW_MODE, viewMode: "table"})
    }

    const handleInputChange = event => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        // if there is nothing searched...
        if(!search){
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
            dispatch({
                type: UPDATE_SEARCH_RESULTS,
                searchResults: state.employees.filter(employee => (
                    employee.name.first.indexOf(debouncedSearchTerm > -1) ||
                    employee.name.last.indexOf(debouncedSearchTerm > -1) 
                    ))
            })

        }
    }, [debouncedSearchTerm]);

    return (
        <div className="d-flex jusitify-content-center">    
            <div>
                {state.viewMode === 'list' ? (
                    <span>
                        <button key="1" className="btn btn-primary mx-2" >List View</button>
                        <button key="2" className="btn btn-outline-primary mx-2" onClick={() => setTableView()}>Table View</button>
                    </span>
                ) : (
                    <span>
                        <button key="3" className="btn btn-outline-primary mx-2" onClick={() => setListView()}>List View</button>
                        <button key="4" className="btn btn-primary mx-2" >Table View</button>
                    </span>
                )}
            </div>
            <div className="d-flex justify-content-center">
                <i className="bi bi-search m-2"></i>
                <input className="form-control ml-2" type="text" onChange={handleInputChange} />
            </div>
        </div>
    )

}

export default DirectoryControls;