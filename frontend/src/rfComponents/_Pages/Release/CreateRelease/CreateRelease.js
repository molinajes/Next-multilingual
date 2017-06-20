import React, { Component } from 'react';
import {observer } from 'mobx-react';

import glamorous, { Div } from "glamorous";
import { BodyText, Heading4 } from "../../../_Atoms/Headings";
import { LabelHeading } from "../../../_Molecules/Labels/LabelHint";
import { SectionBlock } from "../../../_Molecules/Section";
import Input from "../../../_Molecules/Input";
import { Cell } from "../../../_Molecules/Table/Cell";
import { Row } from "../../../_Molecules/Table/Row";
import { Table } from "../../../_Molecules/Table/Table";
import RaisedButton from "../../../_Molecules/Buttons/RaisedButton";
import { _Size } from "../../../_Utils/Sizing";
import { _Palette } from "../../../_Utils/Colours";

import ProgressIcon from "../../ProgressPage/ProgressIcon/ProgressIcon";

const ReleaseNumber = glamorous.div({
	lineHeight: 1.6, // this needs more consideration // how do we know to set lh: 1.6 when in use?
	borderRadius: "2px 0px 0px 2px",
	color: _Palette.TextInactive, // TODO: How do we set this? | AjH
	flex: "1",
	padding: _Size.TINY,
	backgroundColor: _Palette.MangoTint,
	boxShadow: `inset 0 0 1px ${_Palette.Shadow}`,
})

const TablePosition = glamorous(Table)({
	paddingLeft: _Size.MEDIUM,
	paddingRight: _Size.MEDIUM,
})
const OverviewStat = glamorous(Heading4)({
	marginLeft: "auto"
})

const Overview = glamorous(BodyText)({

})

const ButtonContainer = glamorous(SectionBlock)({
	display:"flex", 
	justifyContent:"center",
	marginLeft: "auto",
	marginRight: "auto",
	paddingLeft: 4,
	width: 160,
})

@observer
class CreateRelease extends Component {
	static propTypes = {
		
	}

	render() {
		return (
			<Div display="flex" flexDirection="column">
				<SectionBlock size="SMALL">
					<Div display="flex">
						<div>
							<LabelHeading colorScheme="Mango">&nbsp;#</LabelHeading>
							<ReleaseNumber>1.02</ReleaseNumber>
						</div>
							<Div flex="1">
								<LabelHeading colorScheme="Mango">Name of release</LabelHeading>
								<Input
									addPrompt
									autoFocus
									autoSubmit
									colorScheme={"Mango"}
									// isActive={this.state.active}
									// isHovered={this.state.hovered}
									// value={"Add an asset"}
									placeholder={`Name your Release`}
									// onSubmit={this.onSubmitRequirement}
								/>
							</Div>
						</Div>
				</SectionBlock>
				<SectionBlock size="SMALL">
					<LabelHeading colorScheme="Mango">
						Release note
					</LabelHeading>
					<Input
						addPrompt
						autoFocus
						autoSubmit
						colorScheme="Mango"
						textarea
						// isActive={this.state.active}
						// isHovered={this.state.hovered}
						// value={"Add an asset"}
						placeholder={"What's the purpose of this release?"}
						// onSubmit={this.onSubmitRequirement} // change onsubmit for rule and other components
					/>
				</SectionBlock>
				<SectionBlock size="SMALL">
					<LabelHeading colorScheme="Mango">
						Project overview
					</LabelHeading>
					<TablePosition translucent smallRadius>
						<Row>
							<Cell columnWidth="80%">
								<Overview>New Changes</Overview>
							</Cell>
							<Cell columnWidth="20%" alignNumber>
								<OverviewStat>16</OverviewStat>
							</Cell>
						</Row>
						<Row>
							<Cell columnWidth="80%">
								<Overview>Total Changes</Overview>
							</Cell>
							<Cell columnWidth="20%" alignNumber>
								<OverviewStat>380</OverviewStat>
							</Cell>
						</Row>
						<Row>
							<Cell columnWidth="80%">
								<Overview>Number of assets</Overview>
							</Cell>
							<Cell columnWidth="20%" alignNumber>
								<OverviewStat>380</OverviewStat>
							</Cell>
						</Row>
						<Row>
							<Cell columnWidth="80%">
								<Overview>Completion score</Overview>
							</Cell>
							<Cell columnWidth="20%" alignNumber>
								<OverviewStat><ProgressIcon iconName="np_approve"/></OverviewStat>
							</Cell>
						</Row>
					</TablePosition>
				</SectionBlock>
				<SectionBlock size="MEDIUM">
					<ButtonContainer>
						<RaisedButton
							// -- Set the Size of the button
							size={"MEDIUM"} // "TINY" "SMALL" "MEDIUM" "LARGE1"
							// -- Set event handlers
							// onClick={onClick}
							// onMouseEnter={() => console.log('Mouse Enter')}

							// -- Set a color Scheme that defaults 3 states.
							colorScheme={"Mango"} // "Yellow" "Orange" "Mango" "Primary" "Light"

							// -- Make the button text either an external or internal link
							// externalLink={'https://www.google.com'}
							// link={'/app/model'}

							// -- Force override of state
							// forceHover={true}
							// forceActive={isActive}

							// -- Add an icon (adjusts paddingLeft too)
							// iconName={iconName}

							// -- set width = "100%"
							fullWidth
							// -- Set justifyCenter to center contents
							justifyCenter
						>
							Create Release
						</RaisedButton>
					</ButtonContainer>
				</SectionBlock>
			</Div>
		);
	}
}

export default CreateRelease;
