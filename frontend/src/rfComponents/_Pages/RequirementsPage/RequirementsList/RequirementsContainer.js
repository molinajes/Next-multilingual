import React, { Component } from "react";
import { observer } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { Heading3 } from "../../../_Atoms/Headings";
import Search from "../../../_Molecules/Search";
import { SectionBottomShadow, SectionBlock, SectionPanel, SectionTitle } from "../../../_Molecules/Section";

import RequirementsList from './RequirementsList';

const RequirementsBackground = glamorous(SectionPanel)({
	width: "100%",
});

const TitleBlock = glamorous(SectionTitle)({
	display: "flex", // move to parent component
	alignItems: "center"
});

const TitleBlockSpacing = glamorous(SectionBlock)({
	flex: "1 0 auto",
});

// TODO: Work out how to position the search bar | AjH
const RequirementPositionContainer = glamorous.div({
	width: "480px",
});

@observer
class RequirementsContainer extends Component {
	static propTypes = {
	
	};

	render() {

		return (
			<RequirementsBackground>
				<TitleBlock>
					<TitleBlockSpacing>
						<Heading3>
							Requirements
						</Heading3>
					</TitleBlockSpacing>
					
					<TitleBlockSpacing>
					<RequirementPositionContainer>
						<Search colorScheme="Orange" placeholder="...search" fontSize="SMALL" />
					</RequirementPositionContainer>
					</TitleBlockSpacing>
					<TitleBlockSpacing></TitleBlockSpacing>
				</TitleBlock>
				<Div
					height="86.5vh" // This needs a calc() 100vh - page header - section title bar
					overflowY="scroll"
				>
					<RequirementsList />
				</Div>
				<SectionBottomShadow />
			</RequirementsBackground>
		);
	}
}

export default RequirementsContainer;


