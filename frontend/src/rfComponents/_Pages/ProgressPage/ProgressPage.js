// page
// todo
// override the section title to a custom height [done]
// add the progress overview to the title section [done]
	// split up the steps with headings like in sketch [done]
	// fit with scroll overflow? or small sizes? 
// add the page progress component
	// takes information from the progress page content file

import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import { AppContainer, PageContainer } from "../../_Atoms/Structure";

import ProjectNavigation from "../../Navigation/ProjectNavigation";
import PageHeader from "../../Navigation/PageHeader";
import ProgressOverview from "./ProgressOverview/ProgressOverview";
import ProjectNavigationList from "../../Navigation/ProjectNavigation/ProjectNavigationList";
import ProgressArticle from "./ProgressContent/ProgressArticle";

import glamorous from "glamorous";
// import { _Palette } from "../_Utils/Colours";

import { Heading3 } from "../../_Atoms/Headings";
// import { LabelHeading, LabelHint } from "../_Molecules/Labels/LabelHint";
// import Input from "../_Molecules/Input";
// import RaisedButton from "../_Molecules/Buttons/RaisedButton";

import {
	SectionBlock,
	SectionBottomShadow,
	SectionContainer,
	SectionPanel,
	SectionTitle
} from "../../_Molecules/Section";

// Overrides the height and flex in the base Section Title
const ProgressSectionTitle = glamorous(SectionTitle)({
	display: "block",
	height: "auto",
})


const ArticleContainer = glamorous(SectionBlock)({
	height: "76.5vh", // This needs a calc() 100vh - page header - section title bar
	overflowY: "scroll",
})

@inject('uiStore')
@observer
class ProgressPage extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	};

	render() {
		const {
			uiStore,
		} = this.props;
		
		const data = ProjectNavigationList;
		const step = uiStore.progressStep;


		return (
			<AppContainer>
				<ProjectNavigation />
				<PageContainer>
					<PageHeader
						pageName={uiStore.page ? uiStore.page : "Page Title"}
					/>
					{/* Content goes here */}
						<SectionContainer>
							<SectionPanel>
								<ProgressSectionTitle>
									<Heading3>7 Steps to complete your model</Heading3>
									<ProgressOverview data={data}/>
								</ProgressSectionTitle>
								<ArticleContainer>
									<ProgressArticle 
										// data={contentData}  
										step={step}
									/>
								</ArticleContainer>
							</SectionPanel>
							<SectionBottomShadow />
						</SectionContainer>
					{/* Content ends here */}
				</PageContainer>
			</AppContainer>
		);
	}
}

export default ProgressPage;
