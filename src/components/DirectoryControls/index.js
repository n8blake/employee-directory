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
        <div>
            {state.viewMode === 'list' ? (
                <div>
                    <button key="1" className="btn btn-primary mx-2" >List View</button>
                    <button key="2" className="btn btn-outline-primary mx-2" onClick={() => setTableView()}>Table View</button>
                </div>
            ) : (
                <div>
                    <button key="3" className="btn btn-outline-primary mx-2" onClick={() => setListView()}>List View</button>
                    <button key="4" className="btn btn-primary mx-2" >Table View</button>
                </div>
            )}
        </div>
    )

}

export default DirectoryControls;