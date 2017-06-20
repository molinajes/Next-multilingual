import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconicIcon from '../Iconic/IconicIcon';

@inject("requirementStore")
@observer
class ApprovalSelector extends Component {
	
	static propTypes = {
		parentData: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired
	}

	handleClick = () => {
		const {parentData} = this.props;
		this.props.requirementStore.updateApproval(parentData.persistent_id, parentData.related1_id+1,'');
	}

	render() {
		const {parentData} = this.props;

		let icon = null;
		let iconClass = "requirement__buttonIcon";

		const approvedIcon = <IconicIcon dataSrc={"thumb-up-sm"} iconClass={iconClass} />
		const unapprovedIcon = <IconicIcon dataSrc={"thumb-down-sm"} iconClass={iconClass} />
		const defaultIcon = <IconicIcon dataSrc={"minus-sm"} iconClass={iconClass} />


		switch (parentData.related1_id) {
			case 1: 
				icon = approvedIcon
				break;
			case 2:
				icon = unapprovedIcon
				break;
			default:
				icon = defaultIcon
				break;
		}
		return (
			<div onClick={this.handleClick}>
				{icon}
			</div>
		);
	}
}

export default ApprovalSelector;
