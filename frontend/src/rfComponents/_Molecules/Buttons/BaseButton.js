/*
	NOTE:
	This is a base button component and is not intended to be used directly.
	Components found in the same directory as this one will utilise this to
	achieve the desired result with less passed props and mental overhead.

*/
// Example is at the bottom of file
// TODO: Is sizeObject function correct | AjH

import React, { Component, PropTypes } from "react";

import { Link } from "react-router";

import glamorous, { A } from "glamorous";
import { _TextScale, _Size } from "../../_Utils/Sizing";
import { _Palette } from "../../_Utils/Colours";
import { _Transition } from "../../_Utils/Activity";
import { _ShadowSoft } from "../../_Utils/Shadows";

import Icon from "../../_Molecules/Icons";

const BaseButtonStyled = glamorous.button(
	() => baseStyles(),
	props => propStyles(props)
);

class BaseButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			active: false
		};
	}

	static propTypes = {
		isHover: PropTypes.bool,
		isActive: PropTypes.bool,
		forceHover: PropTypes.bool,
		forceActive: PropTypes.bool,
		fullWidth: PropTypes.bool, // Set width="100%"
		justifyCenter: PropTypes.bool, // Set justifyCenter to center
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onMouseDown: PropTypes.func,
		onMouseUp: PropTypes.func,
		onClick: PropTypes.func,
		inputRef: PropTypes.func,
		children: PropTypes.any,
		iconName: PropTypes.string,
		iconColorScheme: PropTypes.string,
		size: PropTypes.string,
		colorScheme: PropTypes.string,
		isRegularFontWeight: PropTypes.bool,
		link: PropTypes.string,
		externalLink: PropTypes.string,
	};

	handleMouseEnter = e => {
		this.setState({ hovered: true });

		const fn = this.props.onMouseEnter;
		fn && fn(e);
	};

	handleMouseLeave = e => {
		this.setState({ hovered: false, active: false });

		const fn = this.props.onMouseLeave;
		fn && fn(e);
	};

	handleMouseDown = e => {
		this.setState({ active: true });

		const fn = this.props.onMouseDown;
		fn && fn(e);
	};

	handleMouseUp = e => {
		this.setState({ active: false });

		const fn = this.props.onMouseUp;
		fn && fn(e);
	};

	handleClick = e => {
		console.log('handleclick base button')
		const fn = this.props.onClick;
		fn && fn(e);
	};

	render() {
		const {
			colorScheme,
			externalLink,
			forceActive,
			iconColorScheme,
			iconName,
			inputRef,
			link,
			size,
			onClick,
			...other
		} = this.props;

		let icon =
			iconName &&
			<Icon
				isHover={this.state.hovered}
				isActive={forceActive || this.state.active}
				isWhite={forceActive || this.state.active}
				iconName={iconName}
				size={size}
				onClick={onClick}
				// colorScheme={colorScheme}
				colorScheme={iconColorScheme ? iconColorScheme : colorScheme}
			/>;

		let routerLink =
			link &&
			<Link to={link}>
				{this.props.children}
			</Link>;

		let extLink =
			externalLink &&
			<A href={link}>
				{this.props.children}
			</A>;

		return (
			<BaseButtonStyled
				{...other}
				colorScheme={colorScheme}
				iconName={iconName}
				size={size || "SMALL"}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onClick={this.handleClick}
				isHover={this.state.hovered}
				isActive={this.state.active}
				forceActive={forceActive}
				innerRef={inputRef}
			>
				{icon}
				{routerLink}
				{extLink}
				{!routerLink && !extLink && this.props.children} {/* TODO: This does not seem to be working for children passed in higher props | AjH */}
			</BaseButtonStyled>
		);
	}
}

export default BaseButton;

const baseStyles = () => {
	return {
		alignItems: "center",
		borderRadius: _Size.TINY,
		color: _Palette.Black,
		cursor: "pointer",
		display: "flex",
		fontSize: _TextScale.SMALL, // should default go here or through a fallback in props?
		fontWeight: 600,
		outline: 'none',
		transition: _Transition.Highlight,
	};
};

const propStyles = props => {

	let shadow, fontWeight;

	const isHover = props.isHover || props.forceHover;
	const isActive = props.isActive || props.forceActive;

	let sizeObject;

	sizeObject = getSizes(props.size, props.iconName);

	// let paddingLeft;
	// if (props.iconName && props.justifyCenter) {
	// 	paddingLeft = 4
	// }

	if (props.isRaised) {
		shadow = isHover ? _ShadowSoft.Size3 : _ShadowSoft.Size2;
	}

	let justifyCenter = props.justifyCenter ? "center" : null;

	if (props.isRegularFontWeight) {
		fontWeight = 400;
	}

	let colorObject;

	colorObject = getColors(props.colorScheme, props.bgColor, props.textColor);

	if (isHover) {
		colorObject = getHoverColors(
			props.colorScheme,
			props.bgHoverColor,
			props.textHoverColor
		);
	}

	if (isActive) {
		colorObject = getActiveColors(
			props.colorScheme,
			props.bgActiveColor,
			props.textActiveColor
		);
	}


	let width = props.fullWidth ? '100%' : null;

	return {
		...sizeObject,
		...colorObject,
		fontWeight: fontWeight,
		boxShadow: shadow,
		width: width,
		justifyContent: justifyCenter,
		// paddingLeft: paddingLeft,

	};
};

const getSizes = (size, iconName) => {
	let padding;
	switch (size) {
		case "TINY":
			padding = 4; // lineheight 19px
			break;
		case "MEDIUM":
			padding = 12; // lineheight 40px
			break;
		case "LARGE1":
			padding = 14; // lineheight 48px
			break;
		case "SMALL":
		default:
			padding = 8; // lineheight 30px
			break;
	}
		return {
			fontSize: _TextScale[size],
			lineHeight: `${_TextScale[size]+(2*padding)}px`,
			paddingLeft: iconName ? 4 : padding,
			paddingRight: padding,
		};
}

const getColors = (scheme, bgOverride, textOverride) => {
	switch (scheme) {
		case "Yellow":
			return {
				backgroundColor: bgOverride || _Palette.YellowStrong,
				color: textOverride || _Palette.White
			};
		case "Orange":
			return {
				backgroundColor: bgOverride || _Palette.OrangeStrong,
				color: textOverride || _Palette.White
			};
		case "Mango":
			return {
				backgroundColor: bgOverride || _Palette.MangoStrong,
				color: textOverride || _Palette.White
			};
		case "Primary":
			return {
				backgroundColor: bgOverride || _Palette.PrimaryStrong,
				color: textOverride || _Palette.White
			};
		case "Light":
			return {
				backgroundColor: bgOverride || _Palette.Light,
				color: textOverride || _Palette.TextStrong
			};
		default:
			return {
				backgroundColor: bgOverride || undefined,
				color: textOverride || _Palette.White
			};
	}
};

const getHoverColors = (scheme, bgOverride, textOverride) => {
	switch (scheme) {
		case "Yellow":
			return {
				backgroundColor: bgOverride || _Palette.YellowActive,
				color: textOverride || _Palette.WhiteHover
			};
		case "Orange":
			return {
				backgroundColor: bgOverride || _Palette.OrangeActive,
				color: textOverride || _Palette.WhiteHover
			};
		case "Mango":
			return {
				backgroundColor: bgOverride || _Palette.MangoActive,
				color: textOverride || _Palette.WhiteHover
			};
		case "Primary":
			return {
				backgroundColor: bgOverride || _Palette.PrimaryActive,
				color: textOverride || _Palette.WhiteHover
			};
		case "Light":
			return {
				backgroundColor: bgOverride || _Palette.LightBg,
				color: textOverride || _Palette.TextActive
			};
		default:
			return {
				backgroundColor: bgOverride || undefined,
				color: textOverride || _Palette.WhiteHover
			};
	}
};

const getActiveColors = (scheme, bgOverride, textOverride) => {
	switch (scheme) {
		case "Yellow":
			return {
				backgroundColor: bgOverride || _Palette.Yellow,
				color: textOverride || _Palette.White
			};
		case "Orange":
			return {
				backgroundColor: bgOverride || _Palette.Orange,
				color: textOverride || _Palette.White
			};
		case "Mango":
			return {
				backgroundColor: bgOverride || _Palette.Mango,
				color: textOverride || _Palette.White
			};
		case "Primary":
			return {
				backgroundColor: bgOverride || _Palette.Primary,
				color: textOverride || _Palette.White
			};
		case "Light":
			return {
				backgroundColor: bgOverride || _Palette.White,
				color: textOverride || _Palette.TextStrong
			};
		default:
			return {
				backgroundColor: bgOverride || undefined,
				color: textOverride || _Palette.TextActive
			};
	}
};

// Example
// -- Replace base button with RaisedButton, TransparentButton etc..
// <BaseButton
// 	// -- Set the Size of the button
// 	size={"TINY"} // "TINY" "SMALL" "MEDIUM" "LARGE1"
// 	// -- Set event handlers
// 	onClick={onClick}
// 	// onMouseEnter={() => console.log('Mouse Enter')}

// 	// -- Set a color Scheme that defaults 3 states.
// 	colorScheme={"Orange"} // "Yellow" "Orange" "Mango" "Primary" "Light"

// 	// -- Make the button text either an external or internal link
// 	// externalLink={'https://www.google.com'}
// 	// link={'/app/model'}

// 	// -- Force override of state
// 	// forceHover={true}
// 	forceActive={isActive}

// 	// -- Add an icon (adjusts paddingLeft too)
// 	// iconName={iconName}
//  // -- Set Icon color scheme - default to "White"
//	iconColorScheme="White"


// 	// -- set width = "100%"
// 	// fullWidth
// 	// -- Set justifyCenter to center contents
// 	// justifyCenter

// 	// -- Set Font weight to Regular
// 	// isRegularFontWeight

// 	// -- Override any of the bg colors for any of the states
// 	// bgColor={'transparent'}
// 	// bgHoverColor={_Palette.OrangeTint}
// 	// bgActiveColor={_Palette.PrimaryActive}
// 	// -- Override any of the text colors for any of the states
// 	// textColor={_Palette.TextStrong}
// 	// textHoverColor={_Palette.YellowActive}
// 	// textActiveColor={_Palette.WhiteHover}
// >
// 	{children}
// </BaseButton>