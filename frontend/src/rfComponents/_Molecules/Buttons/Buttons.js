// Unoficial documentation: https://www.youtube.com/watch?v=VCLxJd1d84s
import React, { Component, PropTypes } from "react";

import Icon from "../Icons";
import glamorous, { A, Div } from "glamorous";
import { _Size } from "../../_Utils/Sizing";
import { _Palette } from "../../_Utils/Colours";
import { _Transition } from "../../_Utils/Activity";
import { _ShadowSoft } from "../../_Utils/Shadows";

const NavButton = glamorous.div(
	{
		alignItems: "center",
		borderRadius: _Size.TINY,
		color: _Palette.TextStrong,
		cursor: "pointer",
		display: "flex",
		flexGrow: 1,
		lineHeight: `26px`,
		paddingLeft: _Size.TINY,
		paddingRight: _Size.TINY,
		transition: _Transition.Highlight,
	},
	props => ({
		backgroundColor: props.isActive ? props.activeColor : null,
		color: props.isActive ? _Palette.White : null,
		boxShadow: props.isActive ? _ShadowSoft.Size3 : null,
	}),
	props => ({
		backgroundColor: props.isHover && !props.isActive ? props.hoverColor : null,
		color: !props.isActive && props.isHover ? _Palette.TextActive : null,
	}),
);

const Button = glamorous.div(
	{
		borderBottom: `2px dotted ${_Palette.Primary}`,
		margin: _Size.TINY
	},
	props => ({
		backgroundColor: props.isClear ? null : _Palette.Mango
	})
);


class NavigationButton extends Component {
	static propTypes = {
		text: PropTypes.string,
		destination: PropTypes.string,
		hoverColor: PropTypes.string,
		activeColor: PropTypes.string,
		iconName: PropTypes.string,
		iconOpacity: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			active: false
		};
	}

	setHover = () => {
		this.setState({ hovered: true });
	};

	resetHover = () => {
		this.setState({ hovered: false });
	};

	handleClick = () => {
		// this.setState({hovered: true});
		// this.state.active == false
		// 	? this.setState({ active: true })
		// 	: this.setState({ active: false });

		const fn = this.props.onClick;
		fn && fn();
	};

	render() {
		const {
			text,
			destination,
			hoverColor,
			activeColor,
			iconName,
			iconHoverColor,
			iconActiveColor
		} = this.props;

		return (
			<NavButton
				hoverColor={hoverColor}
				activeColor={activeColor}
				onMouseOver={this.setHover}
				onMouseLeave={this.resetHover}
				onClick={this.handleClick}
				isHover={this.state.hovered}
				isActive={this.state.active}
			>
				<Icon
					isHover={this.state.hovered}
					isActive={this.state.active}
					iconName={iconName}
					hoverColor={iconHoverColor}
					activeColor={iconActiveColor}
				/>
				<A href={destination}>
					{text}
				</A>
			</NavButton>
		);
	}
}

export { NavButton, Button, NavigationButton };