// TODO: Contain height of title with elipsis | AjH
import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

import glamorous, { Div } from 'glamorous';
import { SectionBlock, SectionDetails } from "../../../_Molecules/Section";
import { Card } from "../../../_Molecules/Card/Card";
import { LabelHeading, LabelHint } from "../../../_Molecules/Labels/LabelHint";
import Icon from "../../../_Molecules/Icons";
import { _Palette } from "../../../_Utils/Colours";

const PlaceholderInterface = glamorous.div({
	height: "180px",
	backgroundColor: _Palette.Container,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
})

@observer	
class Interface extends Component {
	static propTypes = {
		data: PropTypes.object,
	}

	render() {
		const {data} = this.props;
		
		return (
			<Div width="180px" margin="8px 16px 8px 16px">
				<Card 
					width="180px"
				>
					<PlaceholderInterface>
						<Icon
							color={_Palette.TextFaint}
							defaultColor={_Palette.TextFaint}
							// activeColor={_Palette.Orange}
							// hoverColor={_Palette.TextWeak}
							// isHover={this.state.hovered}
							// isActive={this.state.active} 
							iconName="np_placeholderInterface"
							// size={"LARGE3"}
							sizeOverride="auto"
						/>
					</PlaceholderInterface>
						<Div display="flex">
							<SectionBlock size="SMALL">
								<LabelHeading colorScheme="Orange">{data.name}</LabelHeading>
							</SectionBlock>
							<Div marginLeft="auto" display="flex" alignItems="center">
								{/*<SectionBlock>
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
								</SectionBlock>*/}
								<SectionBlock size="SMALL">
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
				</Card>
				<SectionDetails>
						<LabelHint>24/05/17</LabelHint>
						<LabelHint>R-1234</LabelHint>
				</SectionDetails>
			</Div>
		);
	}
}

export default Interface;
