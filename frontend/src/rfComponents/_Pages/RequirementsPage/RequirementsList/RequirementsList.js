import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";
import { Div } from "glamorous";

import RequirementGroupTitle from "./RequirementGroupTitle";

import RequirementDragWrapper from "./Requirement/RequirementDragWrapper";
import CreateRequirement from './Requirement/CreateRequirement';

@inject("uiStore", "requirementStore")
@observer
class RequirementsList extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired
	};

	render() {
		const { uiStore, requirementStore } = this.props;

		const groupData = requirementStore.groupData;

		// First get an array of all active groups
		const activeGroups = groupData.filter(group => group.expanded);

		// If none are active then we want to map over ALL groups, otherwise just the active ones
		let groupsToMap = activeGroups.length > 0 ? activeGroups : groupData;

		// Then generate output for relevent groups
		const requirementListOutput = groupsToMap.map(group => {
			const requirements = group.children
				.filter(requirement => {
					const checkString = requirement.name
						.toLowerCase()
						.includes(uiStore.requirementSearchInput.toLowerCase());
					return checkString || uiStore.requirementSearchInput === "";
				})
				.map(requirement => {
					const details = requirement.children.map(detail => {
						return (
							<RequirementDragWrapper
								isDetail
								requirementData={detail}
								key={detail.persistent_id}
							/>
						);
					});
					return (
						<RequirementDragWrapper
							requirementData={requirement}
							key={requirement.persistent_id}
						>
							{details}
						</RequirementDragWrapper>
					);
				});

			return (
				<Div key={group.persistent_id}>
					<RequirementGroupTitle groupData={group} />
					{requirements}
					<CreateRequirement groupId={group.persistent_id} number={requirements.length + 1} />
				</Div>
			);
		});

		return (
			<Div>
				{requirementListOutput}
			</Div>
		)
	}
}

export default RequirementsList;
