import React, { Component } from "react";
import { observer } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { _Size } from "../../_Utils/Sizing";

import { Heading3, BodyText } from "../../_Atoms/Headings";
import Icon from "../../_Molecules/Icons";
import { LabelHeading, LabelHint } from "../../_Molecules/Labels/LabelHint";

import {
	SectionBlock,
	SectionTitle
} from "../../_Molecules/Section";

const FlexContainer = glamorous.div({
	alignItems: "center",
	display: "flex",
	textAlign: "center"
});

const AnalyseTitleButtons = glamorous(FlexContainer)({});

@observer
class TraceSectionTitle extends Component {
	static propTypes = {};

	render() {

		const analyseAssets = [
			{
				id: "interfaces",
				name: "Interfaces",
				iconName: "np_interface"
			},
			{
				id: "businessRules",
				name: "Business Rules",
				iconName: "np_businessRule"
			},
			{
				id: "forms",
				name: "Forms",
				iconName: "np_form"
			},
			{
				id: "objects",
				name: "Objects",
				iconName: "np_object"
			},
			{
				id: "useCaseEditor",
				name: "Use Case Editor",
				iconName: "np_useCaseScreen"
			}
		];

		const analyseButtons = analyseAssets.map(asset => {
			return (
				<Div paddingLeft={_Size.TINY}>
					<Icon
						colorScheme="Primary"
						size="MEDIUM"
						iconName={asset.iconName}
					/>
					<LabelHint>{Math.round(Math.random() * 100)}</LabelHint>
				</Div>
			);
		});

		return (
			<SectionTitle>
				<SectionBlock>
					<Heading3>Trace Requirements</Heading3>
				</SectionBlock>
				<FlexContainer css={{ marginLeft: "auto" }}>
					<SectionBlock>
						<BodyText>
							48/80 Requirements have been linked
						</BodyText>
					</SectionBlock>
					<SectionBlock css={{ textAlign: "center" }}>
						<LabelHeading>60%</LabelHeading>
						<LabelHint>Coverage</LabelHint>
					</SectionBlock>
					<SectionBlock css={{ textAlign: "center" }}>
						<LabelHeading colorScheme="Orange">
							80%
						</LabelHeading>
						<LabelHint colorScheme="Orange">
							Goal
						</LabelHint>
					</SectionBlock>
					<AnalyseTitleButtons>
						{analyseButtons}
					</AnalyseTitleButtons>
				</FlexContainer>
			</SectionTitle>
		);
	}
}

export default TraceSectionTitle;
