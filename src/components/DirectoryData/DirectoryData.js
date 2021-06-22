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
					type: UPDATE_EMPLOYEES,
					employees: results.data.results
				})
				dispatch({
					type: UPDATE_SEARCH_RESULTS,
					searchResults: results.data.results
				})
			})
			.catch(error => console.error(error));
	}

	const reverseSortResults = () => {
		const reverseSortedResults = state.searchResults;
		reverseSortedResults.reverse();
		/*const l = state.searchResults.length;
		for(let i = l; i > 0; i++){
			reverseSortedResults.push(state.searchResults[i]);
		}*/
		dispatch({
			type: UPDATE_SEARCH_RESULTS,
			searchResults: reverseSortedResults
		})
	}

	const sortByName = () => {
		dispatch({
			type: SET_VIEW_MODE,
			viewMode: "char"
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
			viewMode: "num"
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
					{ state.viewMode === "char" ? (
						<tr>
							<th className="sortable" onClick={reverseSortResults}>Name 
								<span className="sortIcon"><i class="bi bi-arrow-down-up"></i></span>
							</th>
							<th className="sortable" onClick={sortByNumber}>phone</th>
						</tr>
						) : (
						<tr>
							<th className="sortable" onClick={sortByName}>Name</th>
							<th className="sortable" onClick={reverseSortResults}>phone 
								<span className="sortIcon"><i class="bi bi-arrow-down-up"></i></span>
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
