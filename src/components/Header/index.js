import React from 'react';
import './style.scss';
import fleur from './SVG/Asset-1.svg';

function Header() {
	return(
		<div>
			<h1>Employees</h1>
			<img src={fleur} className='header-embellishment' alt='fleur'/>
		</div>
	);
}

export default Header;