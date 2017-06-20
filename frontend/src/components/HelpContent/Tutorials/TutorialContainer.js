import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';


@observer
class TutorialContainer extends Component {
	static propTypes = {
		children: PropTypes.node
	}

	render() {
		return (
			<div className="tutorial">
				{this.props.children}
			</div>
		);
	}
}

export default TutorialContainer;
