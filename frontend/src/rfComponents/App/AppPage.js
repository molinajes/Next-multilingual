// TODO: Need to use this design for the app page which contains the other pages | AjH
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

import AnalysePage from "../AnalysePage/AnalysePage";

@inject("uiStore")
@observer
class AppTemplate extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	};

	render() {
		const { uiStore } = this.props;

		const page = <AnalysePage />;

		return (
			<AppContainer>
				<ProjectNavigation />
				<PageContainer>
					<PageHeader pageName={uiStore.page ? uiStore.page : "Page Title"} />
					{page}
				</PageContainer>
			</AppContainer>
		);
	}
}

export default AppTemplate;