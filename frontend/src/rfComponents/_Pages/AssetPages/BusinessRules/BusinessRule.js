import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import glamorous, { Div } from 'glamorous';
import { BodyText } from "../../../_Atoms/Headings";
import { SectionBlock, SectionCentring, SectionDetails } from "../../../_Molecules/Section";
import { Card } from "../../../_Molecules/Card/Card";
import { LabelHeading, LabelHint } from "../../../_Molecules/Labels/LabelHint";
import Icon from "../../../_Molecules/Icons";
import { _Palette } from "../../../_Utils/Colours";

const RuleDefinition = glamorous(BodyText)({
	color: _Palette.TextStrong,
})

@observer
class BusinessRule extends Component {
	static propTypes = {
		data: PropTypes.object,
	}

	render() {
		const {data} = this.props;
		console.log(data);
		const businessRuleName =data.name; // name of the asset
		const definition = data.text; 

		return (
			<Div display="flex" marginBottom="16px" marginTop="8px">
				<SectionCentring>
					<SectionDetails>
						<SectionBlock>
							<LabelHint>24/05/17</LabelHint>
							<LabelHint>R-1234</LabelHint>
						</SectionBlock>
					</SectionDetails>
				</SectionCentring>
				<Card 
					// -- Reduce border radius
					// small

					// -- Set shadow level between 0-4 
					// -- 0: border, 1: subtle, 2: floating element, 
					// -- 3: raised, 4: modal
					// shadowLevel="0"

					// -- Set either translucent or white 
					// translucent
					// white

					// -- Helper to set display = "flex"
					// makeFlex

					width="560px"
					// -- Note: set internal margin with SectionBlock or similiar
				>
					<SectionBlock>
						<Div display="flex">
							<SectionBlock>
								<LabelHeading colorScheme="Orange">BR: {businessRuleName}</LabelHeading>
							</SectionBlock>
							<Div marginLeft="auto" display="flex" alignItems="center" height="100%">
								<SectionBlock>
									<Icon
										color={_Palette.TextFaint}
										defaultColor={_Palette.TextFaint}
										// activeColor={_Palette.Orange}
										// hoverColor={_Palette.TextWeak}
										// isHover={this.state.hovered}
										// isActive={this.state.active} 
										iconName="np_delete"
										size={"SMALL"}
									/>
								</SectionBlock>
								<SectionBlock>
									<Icon
										color={_Palette.TextFaint}
										defaultColor={_Palette.TextFaint}
										// activeColor={_Palette.Orange}
										// hoverColor={_Palette.TextWeak}
										// isHover={this.state.hovered}
										// isActive={this.state.active} 
										iconName="np_edit"
										size={"SMALL"}
									/>
								</SectionBlock>
							</Div>
						</Div>
					</SectionBlock>
					<SectionBlock>
						<Card 
							shadowLevel="0"
							translucent
						>
							<SectionBlock>
								<RuleDefinition>
									{definition}
								</RuleDefinition>
							</SectionBlock>
						</Card>
					</SectionBlock>
				</Card>
				<SectionCentring>
					<SectionDetails>
						
					</SectionDetails>
				</SectionCentring>
			</Div>
		);
	}
}

export default BusinessRule;
