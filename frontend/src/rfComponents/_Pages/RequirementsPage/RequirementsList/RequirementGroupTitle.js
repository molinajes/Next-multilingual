import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";

import glamorous, { Div } from "glamorous";
// import RoundIconButton from '../../_Molecules/Buttons/RoundIconButton';
import TransparentButton from "../../../_Molecules/Buttons/TransparentButton";
import { SectionCentring } from "../../../_Molecules/Section";
import { _Palette } from "../../../_Utils/Colours";

const GroupTitle = glamorous.div({
	display: "flex",
	marginTop: 8
});

@observer class RequirementGroupTitle extends Component {
	static propTypes = {
		groupData: PropTypes.object.isRequired
	};

	render() {
		const { groupData } = this.props;
		// console.log(Div)
		return (
			<GroupTitle>
				<SectionCentring />
				<Div width="488px">
					<TransparentButton
						// -- Set the Size of the button
						size={"SMALL"} // "TINY" "SMALL" "MEDIUM" "LARGE1"
						// -- Set event handlers
						// onClick={this.onClick}
						// onMouseEnter={() => console.log('Mouse Enter')}

						// -- Set a color Scheme that defaults 3 states.
						colorScheme={"Mango"} // "Yellow" "Orange" "Mango" "Primary" "Light"
						// -- Make the button text either an external or internal link
						// externalLink={'https://www.google.com'}
						// link={'/app/model'}

						// -- Force override of state
						// forceHover={true}
						// forceActive={groupData.expanded}

						// -- Add an icon (adjusts paddingLeft too)
						iconName={"np_hashtag"}
						// -- Set Icon color scheme - default to "White"
						// iconColorScheme="White"

						// -- set width = "100%"
						fullWidth
						// -- Set justifyCenter to center contents
						// justifyCenter

						// -- Override any of the bg colors for any of the states
						bgColor={_Palette.LightBg}
						bgHoverColor={_Palette.MangoBg}
						// bgActiveColor={_Palette.PrimaryActive}
						// -- Override any of the text colors for any of the states
						textColor={_Palette.TextStrong}
						textHoverColor={_Palette.TextActive}
						// textActiveColor={_Palette.WhiteHover}
					>
						{groupData.name}
					</TransparentButton>
				</Div>
				<SectionCentring />
			</GroupTitle>
		);
	}
}

export default RequirementGroupTitle;