// TODO: Multiple todo items | AjH
// ReleaseName - Created in <CreateRelease />
// ReleaseNote - Created in <CreateRelease />
// PreviewButton - base button style needs to be fixed
// ShareButton - ''
// ReleaseAuthor - Automatically assigned in <CreateRelease /> but not in UI
// TablePositioned is a temporary approach of displaying the information
// The Rows need the line removed
//  ProgressIcon is a placeholder 
// Intentionally no delete button 
import React, { Component } from "react";
import { observer } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { BodyText, Heading4 } from "../../../_Atoms/Headings";
import {
	SectionBlock,
	SectionCentring,
	SectionDetails
} from "../../../_Molecules/Section";
import { Card } from "../../../_Molecules/Card/Card";
import { LabelHeading, LabelHint } from "../../../_Molecules/Labels/LabelHint";
import RaisedButton from "../../../_Molecules/Buttons/RaisedButton";
import { Cell } from "../../../_Molecules/Table/Cell";
import { Row } from "../../../_Molecules/Table/Row";

import ProgressIcon from "../../ProgressPage/ProgressIcon/ProgressIcon";

const ButtonContainer = glamorous(SectionBlock)({
	width: 88,
	paddingBottom: 4
})

const TablePosition = glamorous.div({
	display: "flex",
	// paddingLeft: _Size.MEDIUM,
})
const CompactCell = glamorous(Cell)({
	padding: "0px 4px 0px 4px",
})
const OverviewStat = glamorous(Heading4)({
	// marginLeft: "auto"
})

const Overview = glamorous(BodyText)({

})

@observer class PreviousRelease extends Component {
	static propTypes = {};

	render() {

		const ReleaseName = "R1.01 - First draft for review";
		const ReleaseNote = "First pass of the packages for initial review with the advisory review panel advisors";

		const PreviewButton = "Preview";
		const ShareButton = "Share";

		const ReleaseAuthor = "Username";
		return (
			<Div display="flex" marginBottom="8px" marginTop="8px">
				<SectionCentring>
					<SectionDetails>
						<SectionBlock>
							<LabelHint>24/05/17</LabelHint>
							<LabelHint>R-1234</LabelHint>
						</SectionBlock>
					</SectionDetails>
				</SectionCentring>

				<Card width="560px">
					<SectionBlock> {/*Whole card magin*/}
						<Div display="flex">
							<Div flex="1 0 0">
								<SectionBlock size="SMALL">
									<LabelHeading colorScheme="Orange">
										{ReleaseName}
									</LabelHeading>
								</SectionBlock>
								<SectionBlock size="SMALL">
									<Card shadowLevel="0" translucent>
										<BodyText>{ReleaseNote}</BodyText>
									</Card>
								</SectionBlock>
							</Div>
							<Div display="block" flex="0 0 auto">
								<ButtonContainer>
								<RaisedButton
									// -- Set the Size of the button
									size={"SMALL"} // "TINY" "SMALL" "MEDIUM" "LARGE1"
									// -- Set event handlers
									// onClick={onClick}
									// onMouseEnter={() => console.log('Mouse Enter')}

									// -- Set a color Scheme that defaults 3 states.
									colorScheme={"Orange"} // "Yellow" "Orange" "Mango" "Primary" "Light"

									// -- Make the button text either an external or internal link
									// externalLink={'https://www.google.com'}
									// link={'/app/model'}

									// -- Force override of state
									// forceHover={true}
									// forceActive={isActive}

									// -- Add an icon (adjusts paddingLeft too)
									iconName={"np_external_link"}
									// -- Set Icon color scheme - default to "White"
									iconColorScheme="White"

									// -- set width = "100%"
									fullWidth
									// -- Set justifyCenter to center contents
									justifyCenter
								>
									{PreviewButton}
								</RaisedButton>
								</ButtonContainer>
								<ButtonContainer>
								<RaisedButton
									// -- Set the Size of the button
									size={"SMALL"} // "TINY" "SMALL" "MEDIUM" "LARGE1"
									// -- Set event handlers
									// onClick={onClick}
									// onMouseEnter={() => console.log('Mouse Enter')}

									// -- Set a color Scheme that defaults 3 states.
									colorScheme={"Yellow"} // "Yellow" "Orange" "Mango" "Primary" "Light"

									// -- Make the button text either an external or internal link
									// externalLink={'https://www.google.com'}
									// link={'/app/model'}

									// -- Force override of state
									// forceHover={true}
									// forceActive={isActive}

									// -- Add an icon (adjusts paddingLeft too)
									iconName={"np_createRelease"}
									// -- Set Icon color scheme - default to "White"
									iconColorScheme="White"

									// -- set width = "100%"
									fullWidth
									// -- Set justifyCenter to center contents
									justifyCenter
								>
									{ShareButton}
								</RaisedButton>
								</ButtonContainer>
							</Div>
						</Div>
							<TablePosition translucent smallRadius>
							<Row>
								<CompactCell columnWidth="70%">
									<Overview>New Changes</Overview>
								</CompactCell>
								<CompactCell columnWidth="30%" alignNumber>
									<OverviewStat>16</OverviewStat>
								</CompactCell>
							</Row>
							<Row>
								<CompactCell columnWidth="70%">
									<Overview>Total Changes</Overview>
								</CompactCell>
								<CompactCell columnWidth="30%" alignNumber>
									<OverviewStat>380</OverviewStat>
								</CompactCell>
							</Row>
							<Row>
								<CompactCell columnWidth="70%">
									<Overview># of assets</Overview>
								</CompactCell>
								<CompactCell columnWidth="30%" alignNumber>
									<OverviewStat>380</OverviewStat>
								</CompactCell>
							</Row>
							<Row>
								<CompactCell columnWidth="70%">
									<Overview>Completion</Overview>
								</CompactCell>
								<CompactCell columnWidth="30%" alignNumber>
									<OverviewStat><ProgressIcon iconName="np_approve"/></OverviewStat>
								</CompactCell>
							</Row>
						</TablePosition>
					</SectionBlock>
				</Card>
				<SectionCentring>
					<SectionDetails onRight>
						<SectionBlock>
							<LabelHint>Author:</LabelHint>
							<LabelHint>{ReleaseAuthor}</LabelHint>
						</SectionBlock>
					</SectionDetails>
				</SectionCentring>
			</Div>
		);
	}
}

export default PreviousRelease;