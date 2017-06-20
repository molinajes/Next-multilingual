import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconicIcon from '../Iconic/IconicIcon';

@inject('uiStore')
@observer
class ApprovalFilter extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	}

	onClick = () => {
		this.props.uiStore.setApprovalFilter();
	}

	render() {
		const {uiStore} = this.props;
		const colour = uiStore.approvalFilter ? 'orange' : 'black'
		return (
			<div className="requirement__filters" onClick={this.onClick} style={{'color': colour}}>
				<IconicIcon dataSrc={'thumb-up-sm'} iconClass={'requirement__icon'} />
			</div>
		);
	}
}

export default ApprovalFilter;
