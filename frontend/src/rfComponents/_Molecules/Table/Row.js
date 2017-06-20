// Row component - fits in tables, wraps Cell components
//  EXAMPLE: At the bottom of file :)

// Goal: Create a row component that can used in every table
	//  Uses semantic prop names
	// I do not think it needs a React component

// TODO: Set cursor prop? | AjH
import glamorous from "glamorous";

import { _Transition } from "../../_Utils/Activity";
import { _Palette } from "../../_Utils/Colours";

// This is the standard way of defining a reusable glamorous component
const Row = glamorous.div(
	() => baseStyles(),
	props => propStyles(props)
);

// Base styles are used to set the default styles
	// note: adding styles via props creates a new class so it 
	//  does not overlap with the existing styles.
const baseStyles = () => {
	return {
		borderBottom: `1px solid ${_Palette.TextFaint}`,
		color: _Palette.TextStrong,
		display: "flex",
		flexWrap: "no-wrap",
		height: "auto",
		overflowY: "hidden",
		overflowX: "hidden",
		transition: _Transition.Highlight,
		width: "100%",
	}
};

const propStyles = props => {
	let textColor;
	let padding;

	if (props.header) {
		textColor = _Palette.TextInactive;
		padding = 4;
	}

	return {
		color: textColor,
		paddingTop: padding*2,
		paddingBottom: padding,
	}
}


export {Row};

// Intended Use
// <Row
//  // !Important -- total witdth of cells = 100%
// 	// -- set styles for header
// 	// header 
// >
//	
// </Row>
