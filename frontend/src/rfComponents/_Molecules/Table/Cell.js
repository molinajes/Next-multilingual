// Cell component - fits in rows, wraps any content
//  EXAMPLE: At the bottom of file :)

// Goal: Create a cell component that can used in every row
	//  Uses semantic prop names

import glamorous from "glamorous";

import { _Transition } from "../../_Utils/Activity";
// import { _Palette } from "../../_Utils/Colours";

// This is the standard way of defining a reusable glamorous component
const Cell = glamorous.div(
	() => baseStyles(),
	props => propStyles(props)
);

// Base styles are used to set the default styles
	// note: adding styles via props creates a new class so it 
	//  does not overlap with the existing styles.
const baseStyles = () => {
	return {
		alignItems: "center",
		display: "flex",
		flexWrap: "no-wrap",
		height: "auto",
		padding: "12px 4px 12px 4px",
		overflowY: "hidden",
		overflowX: "hidden",
		transition: _Transition.Highlight,
		width: "100%",
		// border: "1px solid violet",
	}
};

const propStyles = props => {
	let textAlign;

	if (props.alignText) {
		textAlign = "left";
	}
	if (props.alignNumber) {
		textAlign = "right";
	}

	return {
		textAlign: textAlign,
		width: props.columnWidth,
	}
}


export {Cell};

// Intended Use
// <Cell
// 	// -- set text alignment based on content type
// 	// alignNumber
// 	// alignText
//  
//  // -- set width of cell formatted as % e.g. "20%"
//  // -- combined width of cells in row must = 100%
//  columnWidth="33.33%"
// >
//	
// </Table>
