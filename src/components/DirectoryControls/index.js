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
                <button className="btn btn-outline-primary" onClick={() => setTableView()}>List View</button>
            ) : (
                <button className="btn btn-outline-primary" onClick={() => setListView()}>Table View</button>
            )}
        </div>
    )

}

export default DirectoryControls;