import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Group from '../Group/Group';
import CreateGroup from '../Group/CreateGroup';
import ModuleList from '../ModuleList/ModuleList';

@inject('requirementStore', 'uiStore')
@observer
class RequirementView extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	render() {
		const {requirementStore} = this.props;

		let groups = null;
		groups = requirementStore.groupData.map((group, index) => {
			return <Group groupData={group} key={group.id} firstChild={index === 0}/>
			// return <div key={group.id}>{group.id}</div>
		});

		return (

			<div className="gather__content">
				<div className="gather__requirementView">
					<ModuleList />
					<div className="gather__requirementView__modules">
					
						{groups}
						<CreateGroup />
						<div className="requirementView__helpText">
							{
								groups.length 
								?
								"You can drag your requirements around as you see fit.  You can also demote a requirement to become a detail"
								:
								"You have no modules!  Create a module above to begin outlining your requirements."
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RequirementView;

