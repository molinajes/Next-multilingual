import React, { Component } from 'react';
import {observer} from 'mobx-react';


@observer
class ModuleTutorial extends Component {
	/*static propTypes = {
		: PropTypes.object.isRequired
	}*/

	render() {
		return (
			<div className="tutorial__content--module">
				<h2 className="tutorial__header">Modules</h2>
				<p>Group your requirements in modules here.</p>
				<p>Modules help organise your requirements.</p>
			</div>
		);
	}
}

export default ModuleTutorial;
