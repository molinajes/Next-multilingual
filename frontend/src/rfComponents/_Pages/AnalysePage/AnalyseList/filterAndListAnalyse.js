import React from 'react';
import {Div} from 'glamorous';

import RequirementGroupTitle from "../../RequirementsPage/RequirementsList/RequirementGroupTitle";

export default function filterAndListRequirements(WrappedComponent, groupData, uiStore) {
	// First get an array of all active groups
	const activeGroups = groupData.filter(group => group.expanded);

	// If none are active then we want to map over ALL groups, otherwise just the active ones
	let groupsToMap = activeGroups.length > 0 ? activeGroups : groupData;

	// Then generate output for relevent groups

	const output = groupsToMap.map(group => {
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
						<WrappedComponent
							isDetail
							requirementData={detail}
							key={detail.persistent_id}
						/>
					);
				});
				return (
					<WrappedComponent
						requirementData={requirement}
						key={requirement.persistent_id}
					>
						{details}
					</WrappedComponent>
				);
			});

		return (
			<Div key={group.persistent_id}>
				<RequirementGroupTitle groupData={group} />
				{requirements}				
			</Div>
		);
	});

	return output;

}