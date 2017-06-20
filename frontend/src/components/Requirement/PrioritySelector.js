import React, { Component, PropTypes } from 'react';

import {observer, inject} from 'mobx-react';

@inject("requirementStore")
@observer
class PrioritySelector extends Component {
	
	static propTypes = {
		parentData: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired
	}

	handleClick = () => {
		const {parentData, requirementStore} = this.props;
		requirementStore.updateBasicNameOrPriority(parentData.name, parentData.sequence+1 ,parentData.related1_id);
	}

	render() {
		const {parentData} = this.props;
		return (
			<div className="requirement__buttonIcon" onClick={this.handleClick}>
				{getPrioritySymbol(parentData.sequence)}

			</div>
		);
	}
}

const getPrioritySymbol = (priority) => {
	let output = '-';
	if(priority === 1) {
		output = "L";
	}
	else if(priority === 2) {
		output = "M";
	}
	else if(priority === 3) {
		output = "H";
	}
	return output;
}

export default PrioritySelector;
