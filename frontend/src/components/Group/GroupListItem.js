import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import RequirementsListItem from '../Requirement/RequirementsListItem';
import IconicIcon from '../Iconic/IconicIcon';

@inject('requirementStore','uiStore')
@observer
class GroupListItem extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		groupData: PropTypes.object.isRequired
	}

	render() {
		const {groupData} = this.props;

		const requirements = groupData.requirements.map(req => {
			return <RequirementsListItem data={req} key={req.id}/>;
		})

		return (
			<div className="requirementList">
				<div className="requirementList__header">
					<IconicIcon dataSrc={'grid-four-up-sm'} iconClass={'requirementList__header__icon'} />
					{groupData.name}
					{/*<IconicIcon dataSrc={'chevron-bottom-sm'} iconClass={'requirementList__header__icon'} />*/}
				</div>
				{requirements}
				
			</div>
		);
	}
}

export default GroupListItem;
