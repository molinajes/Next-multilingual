// page
import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous from 'glamorous';
import { AppContainer, PageContainer } from "../../_Atoms/Structure";
import { Heading3 } from "../../_Atoms/Headings";
import {
	SectionBlock,
	SectionBottomShadow,
	SectionContainer,
	SectionPanel,
	SectionTitle
} from "../../_Molecules/Section";
import { _Palette } from "../../_Utils/Colours";

import ProjectNavigation from "../../Navigation/ProjectNavigation";
import PageHeader from "../../Navigation/PageHeader";
import CreateRelease from "./CreateRelease/CreateRelease";
import PreviousRelease from "./PreviousRelease/PreviousRelease";

const CreateReleasePanel = glamorous(SectionPanel)({
	borderRight: `2px solid ${_Palette.MangoBg}`,
	width: "256px",
	flex: "0 0 auto",
});

@inject('uiStore')
@observer
class ReleasePage extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	};

	render() {
		const {
			uiStore,
		} = this.props;
		

		return (
			<AppContainer>
				<ProjectNavigation />
				<PageContainer>
					<PageHeader
						pageName={uiStore.page ? uiStore.page : "Page Title"}
					/>
					<SectionContainer>
						<CreateReleasePanel bgColor={_Palette.MangoTint}>
							<SectionTitle bgColor={_Palette.MangoTint}>
								<SectionBlock>
									<Heading3>Create new release</Heading3>
								</SectionBlock>
							</SectionTitle>
								<CreateRelease />
						</CreateReleasePanel>
						<SectionPanel>
							<SectionTitle>
								<SectionBlock>
									<Heading3>
										Previous releases
									</Heading3>
								</SectionBlock>
							</SectionTitle>
							<PreviousRelease />
							<PreviousRelease />
							<PreviousRelease />
						<SectionBottomShadow />
						</SectionPanel>
					</SectionContainer>
					{/* Content goes here */}
				</PageContainer>
			</AppContainer>
		);
	}
}

export default ReleasePage;
