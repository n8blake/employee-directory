import React, {useEffect} from 'react';
import { UPDATE_EMPLOYEES, LOADING } from '../../utils/actions';
import API from '../../utils/API';
import { StoreProvider, useStoreContext } from '../../utils/GlobalState';
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
			})
			.catch(error => console.error(error));
	}

	useEffect(() => {
		getData();
	}, []);

	return(
		<div>
			<div>
			{ state.employees.length ? (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>phone</th>
						</tr>
					</thead>
					<tbody>
						{ state.employees.map(employee => (
							<tr>
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
