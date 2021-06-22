import React, {useEffect} from 'react';
import { SET_VIEW_MODE, UPDATE_EMPLOYEES, UPDATE_SEARCH_RESULTS, LOADING } from '../../utils/actions';
import API from '../../utils/API';
import { useStoreContext } from '../../utils/GlobalState';
import './DirectoryData.scss';

function DirectoryData(){
	const [state, dispatch] = useStoreContext();

	const getData = () => {
		dispatch({type: LOADING});
		API.getEmployees()
			.then(results => {
				//console.log(results.data.results);
				results.data.results.sort((a, b) => {
					if(a.name.last < b.name.last){
						return -1;
					}
					if(a.name.last > b.name.last){
						return 1;
					}
					return 0;
				});
				dispatch({
					type: SET_VIEW_MODE,
					viewMode: "AZ"
				});
				dispatch({
					type: UPDATE_EMPLOYEES,
					employees: results.data.results
				});
				dispatch({
					type: UPDATE_SEARCH_RESULTS,
					searchResults: results.data.results
				});
			})
			.catch(error => console.error(error));
	}

	const reverseSortResults = () => {
		const reverseSortedResults = state.searchResults;
		reverseSortedResults.reverse();
		dispatch({
			type: UPDATE_SEARCH_RESULTS,
			searchResults: reverseSortedResults
		})
		switch(state.viewMode){
			case "AZ":
				dispatch({
					type: SET_VIEW_MODE,
					viewMode: "ZA"
				});
				break;
			case "ZA":
				dispatch({
					type: SET_VIEW_MODE,
					viewMode: "AZ"
				});
				break;
			case "19":
				dispatch({
					type: SET_VIEW_MODE,
					viewMode: "91"
				});
				break;
			case "91":
				dispatch({
					type: SET_VIEW_MODE,
					viewMode: "19"
				});
				break;
			default:
				break;
		}
		
	}

	const sortByName = () => {
		dispatch({
			type: SET_VIEW_MODE,
			viewMode: "AZ"
		});
		const sortedResults = state.searchResults;
		sortedResults.sort((a, b) => {
			if(a.name.last < b.name.last){
				return -1;
			}
			if(a.name.last > b.name.last){
				return 1;
			}
			return 0;
		});
		dispatch({
			type: UPDATE_SEARCH_RESULTS,
			searchResults: sortedResults
		});
	}

	const sortByNumber = () => {
		dispatch({
			type: SET_VIEW_MODE,
			viewMode: "19"
		});
		const sortedResults = state.searchResults;
		sortedResults.sort((a, b) => {
			if(a.phone < b.phone){
				return -1;
			}
			if(a.phone > b.phone){
				return 1;
			}
			return 0;
		});
		dispatch({
			type: UPDATE_SEARCH_RESULTS,
			searchResults: sortedResults
		});
	}

	useEffect(() => {
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	return(
		<div>
			<div>
			{ state.searchResults.length ? (
				<table className="table">
					<thead>	
					{ (state.viewMode === "AZ" || state.viewMode === "ZA") ? (
						<tr>
							<th className="sortable" onClick={reverseSortResults}>Name 
								<span className="sortIcon">
									{ state.viewMode === "AZ" ? (
										<i className="bi bi-sort-alpha-down"></i>
									) : (
										<i className="bi bi-sort-alpha-up-alt"></i>
									)}	
								</span>
							</th>
							<th className="sortable" onClick={sortByNumber}>phone</th>
						</tr>
						) : (
						<tr>
							<th className="sortable" onClick={sortByName}>Name</th>
							<th className="sortable" onClick={reverseSortResults}>phone 
								<span className="sortIcon">
									{ state.viewMode === "19" ? (
										<i className="bi bi-sort-numeric-down"></i>
									) : (
										<i className="bi bi-sort-numeric-up-alt"></i>
									)}
								</span>
							</th>
						</tr>
					)
					}
					</thead>
					<tbody>
						{ state.searchResults.map(employee => (
							<tr key={employee.id.value.replace(/\s/g, "")}>
								<td>{employee.name.first} {employee.name.last}</td>
								<td>{employee.phone}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div>no employees</div>
			)}
			</div>
		</div>
	);
}

export default DirectoryData;
