import React from 'react';
import './style.scss';
import DirectoryControls from '../DirectoryControls/';
import DirectoryData from '../DirectoryData/DirectoryData.js';

class Directory extends React.Component {

	state = {};

	render(){
		return(
			<div>
				<DirectoryControls />
				<DirectoryData />
			</div>
		);
	}
}

export default Directory;