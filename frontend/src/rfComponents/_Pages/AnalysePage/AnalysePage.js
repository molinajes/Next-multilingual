import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

// import glamorous from "glamorous";
// import { _Palette } from "../_Utils/Colours";

import { AppContainer, PageContainer } from "../../_Atoms/Structure";

import AnalyseList from './AnalyseList';
import GroupList from "../RequirementsPage/GroupList/GroupList";


import {
	SectionBottomShadow,
	SectionContainer,
	SectionPanel,
} from "../../_Molecules/Section";

import ProjectNavigation from "../../Navigation/ProjectNavigation";
import PageHeader from "../../Navigation/PageHeader";
import TraceSectionTitle from "./TraceSectionTitle";

// const AnalyseGroupPanel = glamorous(SectionPanel)({
// 	maxWidth: "300px",
// 	// Should we have a utils file with variables for the
// 	// length of common components?
// 	borderRight: `2px solid ${_Palette.MangoBg}`
// });

// const PlaceholderRequirement = glamorous.div({
// 	height: 33,
// 	borderRadius: 2,
// 	backgroundColor: _Palette.Light,
// 	margin: 8,
// 	flex: "1",
// })

@inject("uiStore")
@observer
class AnalysePage extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	};

	render() {
		const { uiStore } = this.props;

		return (
			<AppContainer>
				<ProjectNavigation />
				<PageContainer>
					<PageHeader
						pageName={uiStore.page ? uiStore.page : "Page Title"}
					/>
					<SectionContainer>
						{/*<AnalyseGroupPanel bgColor={_Palette.MangoTint}>
							<SectionTitle bgColor={_Palette.MangoTint}>
								<Heading3>Groups</Heading3>
							</SectionTitle>
							
						</AnalyseGroupPanel>*/}
						<GroupList />
						<SectionPanel>
							<TraceSectionTitle />

							<AnalyseList /> 

						<SectionBottomShadow />
						</SectionPanel>
					</SectionContainer>
				</PageContainer>
			</AppContainer>
		);
	}
}

export default AnalysePage;
