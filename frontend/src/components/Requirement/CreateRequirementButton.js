import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

@inject('uiStore')
@observer
class CreateRequirementButton extends Component {
	static propTypes = {
		requirementId: PropTypes.string.isRequired
	}

	handleClick = () => {
		
	}

	render() {
		return (
			<div className="requirement__create" onClick={this.handleClick}>
				+
			</div>
		);
	}
}

export default CreateRequirementButton;
