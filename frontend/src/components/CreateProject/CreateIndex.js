import React, { Component, PropTypes } from 'react';


class CreateIndex extends Component {

	static propTypes = {
		children: PropTypes.object
	}

	render() {
		// Why does this component exist?
		return (
			<div className="createProject__wrapper">
				<div className="temp_background"></div>
				{this.props.children}
			</div>
		);
	}
}

export default CreateIndex;
