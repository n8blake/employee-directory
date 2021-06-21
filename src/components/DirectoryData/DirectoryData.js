import React, {useEffect} from 'react';
import { UPDATE_EMPLOYEES, UPDATE_SEARCH_RESULTS, LOADING } from '../../utils/actions';
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
						<tr>
							<th>Name</th>
							<th>phone</th>
						</tr>
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
