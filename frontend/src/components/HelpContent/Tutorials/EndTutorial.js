import React, { Component } from 'react';
import {observer} from 'mobx-react';


@observer
class ModuleTutorial extends Component {
	/*static propTypes = {
		: PropTypes.object.isRequired
	}*/

	render() {
		return (
			<div className="tutorial__content--welcome">
				<h2 className="tutorial__header">Thanks for viewing the reqfire tutorial</h2>
				<p>Now begin your first steps to a better product</p>
			</div>
		);
	}
}

export default ModuleTutorial;
