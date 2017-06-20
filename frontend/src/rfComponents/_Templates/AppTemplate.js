import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import {_Palette} from "../_Utils/Colours";

import {
	AppContainer,
	PageContainer,
} from "../_Atoms/Structure";

import {
	SectionBlock,
	SectionBottomShadow,
	SectionContainer,
	SectionPanel,
	SectionTitle
} from "../_Molecules/Section";

import ProjectNavigation from "../Navigation/ProjectNavigation";
import PageHeader from "../Navigation/PageHeader";

@inject("uiStore")
@observer
class AppTemplate extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	};

	render() {
		const { uiStore } = this.props;

		return (
			<AppContainer>
				<ProjectNavigation />
				<PageContainer>
					<PageHeader pageName={uiStore.page ? uiStore.page : "Page Title"} />
					<SectionContainer>
						<SectionPanel> 
							<SectionTitle>
							</SectionTitle>
							<SectionBlock>
							</SectionBlock>
						</SectionPanel>
						<SectionPanel bgColor={_Palette.OrangeTint}> 
							<SectionTitle bgColor={_Palette.OrangeTint}>
							</SectionTitle>
							<SectionBlock>
							</SectionBlock>
						</SectionPanel>
						<SectionBottomShadow />
					</SectionContainer>
				</PageContainer>
			</AppContainer>
		);
	}
}

export default AppTemplate;