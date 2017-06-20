	// TODO: I'm attempting to recreate the FilledButton so we can have tags| AjH
// Currently not finished or working
import React, { Component, PropTypes } from "react";

import Icon from "../Icons";
import glamorous, { A } from "glamorous";
import { _TextSize, _Size } from "../../_Utils/Sizing";
import { _Palette } from "../../_Utils/Colours";
import { _Transition } from "../../_Utils/Activity";
// import { _ShadowSoft } from "../_Utils/Shadows";

import { _ShadowSoft } from "../../_Utils/Shadows";

const TextButtonBase = glamorous.div(
	() => baseStyles(),
	props => propStyles(props)
);

class TextButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			active: false
		};
	}

	static propTypes = {
		activityFill: PropTypes.bool,
		Color: PropTypes.string,
		iconName: PropTypes.string,
		Size: PropTypes.string,
		
		children: PropTypes.any,
		isHover: PropTypes.bool,
		isActive: PropTypes.bool,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onMouseDown: PropTypes.func,
		onMouseUp: PropTypes.func,
		onClick: PropTypes.func,
	};

	// setHover = () => {
	// 	this.setState({ hovered: true });
	// };

	// resetHover = () => {
	// 	this.setState({ hovered: false });
	// 	console.log("HW!");
	// };

	// toggleActive = () => {
	// 	// this.setState({hovered: true});
	// 	this.state.active == false
	// 		? this.setState({ active: true })
	// 		: this.setState({ active: false });
	// };

	handleMouseEnter = e => {
		this.setState({ hovered: true });

		const fn = this.props.onMouseEnter;
		fn && fn(e);
	};

	handleMouseLeave = e => {
		this.setState({ hovered: false });

		const fn = this.props.onMouseLeave;
		fn && fn(e);
	};

	handleMouseDown = e => {
		const fn = this.props.onMouseDown;
		fn && fn(e);
	};

	handleMouseUp = e => {
		const fn = this.props.onMouseUp;
		fn && fn(e);
	};

// I added the active state action and I don't know if it is correct AjH
	handleClick = e => {
			this.state.active == false
				? this.setState({ active: true })
				: this.setState({ active: false });

		const fn = this.props.onClick;
		fn && fn(e);
	};

	render() {
		// const { hoverColor, iconName, text, textColor, Size, ...other } = this.props;

		const {
			activityFill,
			Color,
			iconName,
			Size,
			...other
		} = this.props;

		return (
			<TextButtonBase
				{...other}
				activityFill={activityFill}
				Color={Color}
				Size={Size}

				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onClick={this.handleClick}
				isHover={this.state.hovered}
				isActive={this.state.active}
			>
				{iconName
					? <Icon
							isHover={this.state.hovered}
							isActive={this.state.active}
							iconName={iconName}
							Color={Color ? Color : null}
							Size={Size}
							isWhite={activityFill ? true : null}
							// activeColor={activityFill ? _Palette.White : null}
						/>
					: null}
				<A 
					textOverflow="ellipsis"
					whiteSpace="nowrap"
					overflow="hidden"
					// href="here boy" 
				>
					{this.props.children}
				</A>
			</TextButtonBase>
		);
	}
}

export default TextButton;

const baseStyles = () => {
	return {
		alignItems: "center",
		borderRadius: _Size.TINY,
		color: _Palette.TextActive,
		cursor: "pointer",
		display: "flex",
		lineHeight: 1.8,
		transition: _Transition.Highlight,
		// hyphens: "auto",
		// wordBreak: "break-all",

		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflow: "hidden",
	};
};

const propStyles = props => {
	let activeBg, color, paddingSize, shadow, bgColor, fontSize;

	switch (props.Color) {
		case "Yellow":
			bgColor = props.activityFill && props.isHover
				? _Palette.YellowBg
				: null;
			color = _Palette.Yellow;
			activeBg = props.activityFill && props.isActive ? color : null;
			break;
		case "Orange":
			bgColor = props.activityFill && props.isHover
				? _Palette.OrangeBg
				: null;
			color = _Palette.Orange;
			activeBg = props.activityFill && props.isActive ? color : null;
			break;
		case "Mango":
			bgColor = props.activityFill && props.isHover
				? _Palette.MangoBg
				: null;
			color = _Palette.Mango;
			activeBg = props.activityFill && props.isActive ? color : null;
			break;
		case "Primary":
		default:
			bgColor = props.activityFill && props.isHover
				? _Palette.PrimaryBg
				: null;
			color = _Palette.Primary;
			activeBg = props.activityFill && props.isActive ? color : null;
			break;
	}

	if (props.activityFill && props.isActive) {
		color = _Palette.WhiteHover;
		shadow = _ShadowSoft.Size1;
	}

	if (props.Size) {
		fontSize = _TextSize[props.Size];
		paddingSize = _Size[props.Size]/2;
	}

	return {
		backgroundColor: props.isActive ? activeBg : bgColor,
		boxShadow: shadow,
		color: color,
		fontSize: fontSize,
		paddingLeft: paddingSize, 
		paddingRight: paddingSize,
	};
};