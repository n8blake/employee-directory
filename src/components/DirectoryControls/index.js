import React, { useEffect } from "react";
import { useStoreContext } from '../../utils/GlobalState';
import { SET_VIEW_MODE, LOADING } from '../../utils/actions';
import './style.scss';

function DirectoryControls() {

    const [state, dispatch] = useStoreContext();

    const setListView = () => {
        dispatch({type: SET_VIEW_MODE, viewMode: "list"})
    }

    const setTableView = () => {
        dispatch({type: SET_VIEW_MODE, viewMode: "table"})
    }

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
                <input className="form-control ml-2" type="text" />
            </div>
        </div>
    )

}

export default DirectoryControls;