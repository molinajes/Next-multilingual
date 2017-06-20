// TODO: Add example to the bottom of file | AjH
import React, { Component, PropTypes } from "react";
import NounIcon from "../_Atoms/NounIcon";

import glamorous from "glamorous";
import { _TextScale, _Size } from "../_Utils/Sizing";
import { _Palette } from "../_Utils/Colours";
import { _Transition } from "../_Utils/Activity";

const IconBase = glamorous.div(() => baseStyles(), props => propStyles(props));

class Icon extends Component {
	static propTypes = {
		iconName: PropTypes.string,
		iconOpacity: PropTypes.string,
		color: PropTypes.string,
		size: PropTypes.string,
		sizeOverride: PropTypes.string,
		isHover: PropTypes.bool,
		isActive: PropTypes.bool,
		isWhite: PropTypes.bool, // I think we should keep this here? kinda...
		onClick: PropTypes.func
	};

	render() {
		const { iconName, onClick, ...other } = this.props;
		// console.log("Icon rendered", iconName)
		return (
			<IconBase {...other}>
				<NounIcon svgSrc={iconName} onClick={onClick}/>
			</IconBase>
		);
	}
}

export default Icon;

const baseStyles = () => {
	return {
		display: "flex",
		flex: '0 0 0',
		margin: _Size.TINY / 2,
		transition: _Transition.Highlight,		
		"& span": {
			display: 'flex'
		},
		"& svg": {
			// padding: 1,
			height: _TextScale.MEDIUM, // Fallback size
			width: _TextScale.MEDIUM
		}
	};
};

const propStyles = props => {
	let color, marginOverride, size;

	let defaultColor = props.defaultColor;
	let hoverColor = props.hoverColor;
	let activeColor = props.activeColor;

	color = props.color;
	color = props.isHover ? hoverColor : color;
	color = props.isActive ? activeColor : color;

	switch (props.colorScheme) {
		case "Yellow":
			color = defaultColor || _Palette.Yellow;
			if (props.isHover) {
				color = hoverColor || _Palette.YellowActive;
			}
			if (props.isActive) {
				color = activeColor || _Palette.YellowActive;
			}
			break;
		case "Orange":
			color = defaultColor || _Palette.Orange;
			if (props.isHover) {
				color = hoverColor || _Palette.OrangeActive;
			}
			if (props.isActive) {
				color = activeColor || _Palette.OrangeActive;
			}
			break;
		case "Mango":
			color = defaultColor || _Palette.Mango;
			if (props.isHover) {
				color = hoverColor || _Palette.MangoActive;
			}
			if (props.isActive) {
				color = activeColor || _Palette.MangoActive;
			}
			break;
		case "Primary":
			color = defaultColor || _Palette.Primary;
			if (props.isHover) {
				color = hoverColor || _Palette.PrimaryActive;
			}
			if (props.isActive) {
				color = activeColor || _Palette.PrimaryActive;
			}
			break;
		case "White":
			color = defaultColor || _Palette.White;
			if (props.isHover) {
				color = hoverColor || _Palette.WhiteHover;
			}
			if (props.isActive) {
				color = activeColor || _Palette.White;
			}
			break;
		case "TextInactive":
			color = defaultColor || _Palette.TextInactive;
			if (props.isHover) {
				color = hoverColor || _Palette.TextActive;
			}
			if (props.isActive) {
				color = activeColor || _Palette.TextStrong;
			}
			break;
		case "TextWeak":
			color = defaultColor || _Palette.TextWeak;
			if (props.isHover) {
				color = hoverColor || _Palette.TextInactive;
			}
			if (props.isActive) {
				color = activeColor || _Palette.TextStrong;
			}
			break;
		case "Text":
		default:
			color = defaultColor || _Palette.TextActive;
			if (props.isHover) {
				color = hoverColor || _Palette.TextInactive;
			}
			if (props.isActive) {
				color = activeColor || _Palette.TextStrong;
			}
			break;
	}
	// sizeOverride is when you want to manually set the size in the containing box
	size = props.sizeOverride || _TextScale[props.size];
	marginOverride = props.sizeOverride ? 0 : undefined;

	// Legacy?  Can do differently as above?
	if (props.isActive && props.isWhite) {
		color = _Palette.White;
	}

	return {
		margin: marginOverride,
		"& svg": {
			height: size,
			width: size
		},
		"& svg *": {
			fill: color
		}
	};
};

// <Icon 
// 	iconName="np_interface" 
// 	size="SMALL" 
// 	colorScheme={active ? "Text" : "TextInactive"}
// 	/>