import React, { Component } from 'react';
import {observer} from 'mobx-react';


@observer
class LinkTutorial extends Component {
	/*static propTypes = {
		: PropTypes.object.isRequired
	}*/

	render() {
		return (
			<div className="tutorial__content--link">
				<h2 className="tutorial__header">Link Tutorial</h2>
				<p>Link components such as interfaces and business rules</p>
				<p>here via the dropdown menu</p>
				<img src="https://www.reqfire.com/pages/assets/landing/20170116%20Gather%20screen--tiny.png" alt=""/>
			</div>
		);
	}
}

export default LinkTutorial;
