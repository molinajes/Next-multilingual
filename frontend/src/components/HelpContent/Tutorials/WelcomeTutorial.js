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
				<h2 className="tutorial__header">Welcome to the reqfire tutorial</h2>
				<p>The following steps will guide you through using reqfire</p>
				<p>to build your product</p>
			</div>
		);
	}
}

export default ModuleTutorial;
