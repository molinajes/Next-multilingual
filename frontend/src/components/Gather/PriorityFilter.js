import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

@inject('uiStore')
@observer
class PriorityFilter extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	}

	onClick = () => {
		this.props.uiStore.setPriorityFilter();
	}

	render() {
		const {uiStore} = this.props;
		const colour = uiStore.priorityFilter ? 'orange' : 'black'
		return (
			<div className="requirement__filters" onClick={this.onClick} style={{'color': colour}}>
				<div className="requirement__icon">H</div>
			</div>
		);
	}
}

export default PriorityFilter;
