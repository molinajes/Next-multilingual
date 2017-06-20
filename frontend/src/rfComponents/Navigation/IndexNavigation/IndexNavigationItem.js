import React, { Component, PropTypes } from 'react';

import { _Palette } from "../../_Utils/Colours";
import TransparentButton from '../../_Molecules/Buttons/TransparentButton';


class IndexNavigationItem extends Component {
	static propTypes = {
		iconName: PropTypes.string,
		onClick: PropTypes.func,
		isActive: PropTypes.bool,
		children: PropTypes.any,
	}


	render() {
		const {onClick, iconName, isActive, children, ...other } = this.props;
		return (
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
				iconColorScheme={"Primary"}
				// Override any of the bg colors for any of the states 
				// with a specific color
					// bgColor={'transparent'}
					// bgHoverColor={_Palette.OrangeTint}
					// bgActiveColor={"transparent"}

				// Override any of the text colors for any of the states 
				// with a specific color
					// textColor={_Palette.Orange}
					// textHoverColor={_Palette.YellowActive}
					textActiveColor={_Palette.White}

				// Regular Font weight
					// isRegularFontWeight
				// Add an icon
					iconName={iconName}

				// Make the button text either an external or internal link
					// externalLink={'https://www.google.com'}
					// link={'/app/model'}


				// Force override of state
					// forceHover={true}
				forceActive={isActive}
			>				
					{children}		
			</TransparentButton> 
		);
	}
}

export default IndexNavigationItem;
