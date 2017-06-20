import React, { Component } from 'react';
import {observer} from 'mobx-react';


@observer
class Nav2Tutorial extends Component {
	/*static propTypes = {
		: PropTypes.object.isRequired
	}*/

	render() {
		return (
			<div className="tutorial__content--link">
				<h2 className="tutorial__header">You can also use the arrow keys to</h2>
				<p>NAVIGATE</p>
				<p>through the tutorial items...</p>
			</div>
		);
	}
}

export default Nav2Tutorial;
