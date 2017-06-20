import React, { Component, PropTypes } from 'react';

import { Div } from "glamorous";
import {_Palette} from "../_Utils/Colours";
import TransparentButton from '../_Molecules/Buttons/TransparentButton';
import ProgressIcon from "../_Pages/ProgressPage/ProgressIcon/ProgressIcon";

class NavigationItem extends Component {
	static propTypes = {
		iconName: PropTypes.string,
		onClick: PropTypes.func,
		isActive: PropTypes.bool,
		children: PropTypes.any,
	}


	render() {
		const {onClick, iconName, isActive, children, ...other } = this.props;
		return (
			<Div 
				display="flex"
				opacity={isActive ? 1 : 0.64}
				>
				<ProgressIcon 
					iconName={iconName}
					size="SMALL"
				/>
			<TransparentButton
				{...other}
				// Set the Size of the button
					size={"SMALL"}
					fullWidth

				// Set event handlers
				onClick={onClick}
					// onMouseEnter={() => console.log('Mouse Enter')}

				// Set a color Scheme that defaults 3 states.
				// Normal, Hover, Active
				colorScheme={"Mango"}

				// Override any of the bg colors for any of the states 
				// with a specific color
					// bgColor={'transparent'}
					// bgHoverColor={_Palette.OrangeTint}
					bgActiveColor={"transparent"}

				// Override any of the text colors for any of the states 
				// with a specific color
					// textColor={_Palette.Orange}
					// textHoverColor={_Palette.YellowActive}
					// textActiveColor={_Palette.WhiteHover}

				// Regular Font weight
					// isRegularFontWeight
				// Add an icon
					// iconName={iconName}

				// Make the button text either an external or internal link
					// externalLink={'https://www.google.com'}
					// link={'/app/model'}


				// Force override of state
					// forceHover={true}
				forceActive={isActive}
			>				
				<Div 
					color={isActive ? _Palette.TextStrong : _Palette.TextActive}
					textShadow={isActive ? `0 1px 1px ${_Palette.ShadowSoft}` : null}
				>
					{children}
				</Div>				
			</TransparentButton> 
			</Div>
		);
	}
}

export default NavigationItem;
