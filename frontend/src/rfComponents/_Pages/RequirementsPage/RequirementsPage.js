import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous from "glamorous";
import {
	PageContainer,
	AppContainer,
	// WindowContainer,
} from "../../_Atoms/Structure";
import { SectionContainer } from "../../_Molecules/Section";

import ProjectNavigation from "../../Navigation/ProjectNavigation";
import PageHeader from "../../Navigation/PageHeader";

import RequirementsContainer from "./RequirementsList/RequirementsContainer";
import GroupList from "./GroupList/GroupList";

const RequirementsPageContainer = glamorous(SectionContainer)({
	display: "flex",
	flexDirection: "row"
});

@inject("uiStore")
@observer
class RequirementsPage extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
	};

	render() {
		const { uiStore } = this.props;

		return (
			<AppContainer>
				<ProjectNavigation />
				<PageContainer>
					<PageHeader pageName={uiStore.page}>
					</PageHeader>
					<RequirementsPageContainer>
						<GroupList />
						<RequirementsContainer />
					</RequirementsPageContainer>
				</PageContainer>
			</AppContainer>
		);
	}
}
export default RequirementsPage;