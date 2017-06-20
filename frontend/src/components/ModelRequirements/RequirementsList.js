import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import GroupListItem from '../Group/GroupListItem';
// import IconicIcon from '../Iconic/IconicIcon';

@inject('requirementStore')
@observer
class RequirementsList extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired
	}

	render() {
		const {requirementStore} = this.props;

		const groups = requirementStore.groupData.map((group) => {
			return <GroupListItem groupData={group} key={group.id}/>
		});

		// <RequirementsListItem data={req} key={`${req.id}`}/>

		return (
			<div>
				{groups}
			</div>
		);
	}
}

export default RequirementsList;
