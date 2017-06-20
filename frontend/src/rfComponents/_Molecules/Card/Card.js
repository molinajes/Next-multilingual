// Card component - widespread use
//  EXAMPLE: At the bottom of file :)

// TODO: Migrate other card components to use this one | AjH
	// add docs and standards for width
// Goal: Create a card component that can be used everywhere
	//  Uses semantic prop names
	// Intention is that this component can get build on top of
	// I do not think it needs a React component

import glamorous from "glamorous";

import { _Transition } from "../../_Utils/Activity";
import { _Palette } from "../../_Utils/Colours";
import { _ShadowSoft } from "../../_Utils/Shadows";

// This is the standard way of defining a reusable glamorous component
const Card = glamorous.div(
	() => baseStyles(),
	props => propStyles(props)
);

// Base styles are used to set the default styles
	// note: adding styles via props creates a new class so it 
	//  does not overlap with the existing styles.
const baseStyles = () => {
	return {
		borderRadius: 4,
		backgroundColor: _Palette.Light,
		width: "100%",
		height: "100%",
		boxShadow: _ShadowSoft.Size2,
		transition: _Transition.Highlight,
	}
};

const propStyles = props => {
	let bgColor;
	let display;
	let radiusSize;
	let shadow;
	let width;

	if (props.shadowLevel) {
		shadow = _ShadowSoft[`Size${props.shadowLevel}`];
	}

	if (props.makeFlex) {
		display = "flex";
	}

	if (props.small) {
		radiusSize = 2; 
	}

	if (props.translucent) {
		bgColor = _Palette.LightBg;
	}
	if (props.white) {
		bgColor = _Palette.White;
	}

	if (props.width) {
		width = props.width;
	}

	// Does this always get returned? should we put the default props here?
		// Passing incorrect props will not override shadow
		// Passing both white and translucent overrides with white
	return {
		borderRadius: radiusSize,
		boxShadow: shadow,
		display: display,
		backgroundColor: bgColor,
		width: width,
	}
}


export {Card};

// Intended Use
// <Card 
// 	// -- Reduce border radius
// 	// small

// 	// -- Set shadow level between 0-4 
// 	// -- 0: border, 1: subtle, 2: floating element, 
// 	// -- 3: raised, 4: modal
// 	// shadowLevel="0"

// 	// -- Set either translucent or white 
// 	// translucent
// 	// white

// // -- Helper to set display = "flex"
// // makeFlex

// 	// -- Note: set internal margin with SectionBlock or similiar
// >
// </Card>