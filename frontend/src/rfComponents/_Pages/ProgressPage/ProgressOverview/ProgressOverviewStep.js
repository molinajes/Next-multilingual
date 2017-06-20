// add icon
// Add title
// take information from page type
import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";

import { Div } from "glamorous";
import TransparentButton from "../../../_Molecules/Buttons/TransparentButton";
import Icon from "../../../_Molecules/Icons";
import { _Palette } from "../../../_Utils/Colours";

import ProgressIcon from "../ProgressIcon/ProgressIcon";

@observer class ProgressOverviewStep extends Component {
	static propTypes = {
		onClick: PropTypes.func,
		isActive: PropTypes.bool,

		iconName: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	};

	render() {
		const { iconName, onClick, name, isActive, ...other } = this.props;

		return (
			<Div
				display="flex"
				flexDirection="column"
				alignItems="center"
				flex="1"
				minWidth="104px"
			>
				{name === "Finish"
					? <Div>
						<Icon size="LARGE3" iconName={iconName} />
					</Div>
					: <ProgressIcon iconName={iconName} />}
				<TransparentButton
					{...other}
					// Set the Size of the button
					size={"TINY"}

					// Set event handlers
					onClick={onClick}
					// onMouseEnter={() => console.log('Mouse Enter')}

					// Set a color Scheme that defaults 3 states.
					// Normal, Hover, Active
					colorScheme={"Orange"}
					// Override any of the bg colors for any of the states
					// with a specific color
					// bgColor={'transparent'}
					// bgHoverColor={_Palette.OrangeTint}
					// bgActiveColor={_Palette.PrimaryActive}

					// Override any of the text colors for any of the states
					// with a specific color
					textColor={_Palette.TextStrong}
					// textHoverColor={_Palette.YellowActive}
					// textActiveColor={_Palette.WhiteHover}

					// Regular Font weight
					isRegularFontWeight
					// Add an icon
					// iconName={iconName}

					// Make the button text either an external or internal link
					// externalLink={'https://www.google.com'}
					// link={'/app/model'}

					// Force override of state
					// forceHover={true}
					forceActive={isActive}
				>
					{name}
				</TransparentButton>
			</Div>
		);
	}
}

export default ProgressOverviewStep;