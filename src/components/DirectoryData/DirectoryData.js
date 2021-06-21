import React, {useEffect} from 'react';
import { UPDATE_EMPLOYEES, LOADING } from '../../utils/actions';
import API from '../../utils/API';
import { useStoreContext } from '../../utils/GlobalState';
import style from './DirectoryData.scss';

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
				
			</div>
			<div>
			{ state.employees.length ? (
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>phone</th>
						</tr>
					</thead>
					<tbody>
						{ state.employees.map(employee => (
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
