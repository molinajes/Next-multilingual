// page
import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { AppContainer, PageContainer } from "../../_Atoms/Structure";
import { Heading3 } from "../../_Atoms/Headings";
import { Card } from "../../_Molecules/Card/Card";
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
import ActorTable from "./ActorTable";

// const ActorTitle = glamorous(SectionTitle)({
// 	// flexDirection: "column",
// 	// alignItems: "flex-start"
// 	// display: "block",
// })

const ActorDiagram = glamorous(SectionPanel)({
	borderLeft: `2px solid ${_Palette.OrangeBg}`,
	width: "480px",
	flex: "0 0 auto",
});

@inject('uiStore')
@observer
class ActorsPage extends Component {
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
						<SectionPanel>
							<SectionTitle>
								<SectionBlock>
									<Heading3>
										Actor list
									</Heading3>
								</SectionBlock>
							</SectionTitle>
							<ActorTable />
						<SectionBottomShadow />
						</SectionPanel>
						<ActorDiagram bgColor={_Palette.OrangeTint}>
							<SectionTitle bgColor={_Palette.OrangeTint}>
								<SectionBlock>
									<Heading3>Actor inheritance</Heading3>
								</SectionBlock>
							</SectionTitle>
							<Div  flex="1 0 auto" margin="16px" 
								// border="1px dotted black"
							>
								<Card
									shadowLevel="1"
								>
									<Div height="560px">
										Actor inheritance diagram but beautifulish
									</Div>
								</Card>
							</Div>

						</ActorDiagram>
					</SectionContainer>
					{/* Content goes here */}
				</PageContainer>
			</AppContainer>
		);
	}
}

export default ActorsPage;
