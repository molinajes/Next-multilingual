// TODO: Create example for the component | AjH
// Checkboxes
// Used on Add Form
import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";

import glamorous from "glamorous";
// import { Label, Paragraph } from "../../_Atoms/Headings";
import { _Transition } from "../../_Utils/Activity";
import { _TextScale, _Size } from "../../_Utils/Sizing";
import { _Palette } from "../../_Utils/Colours";
import Icon from "../../_Molecules/Icons";

const CheckboxBase = glamorous.div(
	() => baseStyles(),
	props => propStyles(props)
);

@observer class Checkbox extends Component {
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
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onMouseDown: PropTypes.func,
		onMouseUp: PropTypes.func,
		onClick: PropTypes.func,
		bgColor: PropTypes.string,
		isSubtle: PropTypes.bool,
	};

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
		// this.setState({ active: true });

		const fn = this.props.onMouseDown;
		fn && fn(e);
	};

	handleMouseUp = e => {
		// Taken from BaseButton then commented out
		// this.setState({ active: false });

		const fn = this.props.onMouseUp;
		fn && fn(e);
	};

	handleClick = e => {
		// Added for UI testing
		this.state.active == false
			? this.setState({ active: true })
			: this.setState({ active: false });

		// Taken from Base Button
		const fn = this.props.onClick;
		fn && fn(e);
	};

	render() {
		const { isSubtle, forceActive } = this.props;
		return (
			<CheckboxBase
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onClick={this.handleClick}
				isHover={this.state.hovered}
				isActive={this.state.active}
				forceActive={forceActive}
				isSubtle={isSubtle}
			>
				<Icon
					// TODO: Improve the approved no box icon to be bigger looking | AjH
					iconName="np_approved_noBox"
					// hard-coded and relies on background color being white
					isActive 
					isWhite
					sizeOverride="11px"
				/>
			</CheckboxBase>
		);
	}
}

export default Checkbox;

// export {Checkbox};

const baseStyles = () => {
	return {
		height: _TextScale.TINY,
		width: _TextScale.TINY,
		boxShadow: `0 0 0 1px ${_Palette.TextWeak}`,
		backgroundColor: _Palette.White,
		borderRadius: 1,
		transition: _Transition.Notify, // Good use of notify instead of Highlight to show action 
		margin: _Size.TINY / 2,
		cursor: "pointer"
	};
};

const propStyles = props => {
	let color;
	// Includes fallback color
	color = _Palette[props.bgColor ? props.bgColor : "Orange"];

	if (props.isActive) {
		return {
			backgroundColor: color,
			boxShadow: `0 0 0 2px ${color}` // provides the 'scale' increase to checkbox
		};
	}

	// Potentially rename... 
	if (props.isSubtle && !props.isActive && !props.isHover) {
		return {
			// This is 0.5 because of our alpha color scale Faint is half weak is half inactive 
			opacity: 0.5,
		};
	}

	if (props.isHover) {
		return {

			// Leaving this commented bit here in case we want to change hover to color
			// backgroundColor: _Palette[
			// 	`${props.bgColor ? props.bgColor : "Orange"}Bg`
			// ]
			backgroundColor: _Palette.TextFaint
		};
	}
};