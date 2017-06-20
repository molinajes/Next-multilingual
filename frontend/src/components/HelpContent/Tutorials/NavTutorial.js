import React, { Component } from 'react';
import {observer} from 'mobx-react';


@observer
class NavTutorial extends Component {
	/*static propTypes = {
		: PropTypes.object.isRequired
	}*/

	render() {
		return (
			<div className="tutorial__content--link">
				<h2 className="tutorial__header">Navigate to other pages bla bla</h2>
				<p>NAVIGATE</p>
				<p>here via the menu</p>2
			</div>
		);
	}
}

export default NavTutorial;
