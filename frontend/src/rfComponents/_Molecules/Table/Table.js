// Table component - wrapper for Rows 
//  EXAMPLE: At the bottom of file :)

// Goal: Create a table component that can wrap every table
	//  Uses semantic prop names
	// I do not think it needs a React component

import glamorous from "glamorous";
import { _Palette } from "../../_Utils/Colours";

// This is the standard way of defining a reusable glamorous component
const Table = glamorous.div(
	() => baseStyles(),
	props => propStyles(props)
);

// Base styles are used to set the default styles
	// note: adding styles via props creates a new class so it 
	//  does not overlap with the existing styles.
const baseStyles = () => {
	return {
		borderRadius: 4,
		borderCollapse: "collapse",
		borderSpacing: "0",
		height: "auto",
		overflowY: "hidden",
		overflowX: "hidden",
		padding: 8,
		width: "100%",
	}
};

const propStyles = props => {
	let bgColor;
	let radiusSize;

	if (props.smallRadius) {
		radiusSize = 2; 
	}

	if (props.translucent) {
		bgColor = _Palette.LightBg;
	}
	if (props.light) {
		bgColor = _Palette.Light;
	}
	if (props.white) {
		bgColor = _Palette.White;
	}

	// Does this always get returned? should we put the default props here?
		// Passing incorrect props will not override shadow
		// Passing both white and translucent overrides with white
	return {
		borderRadius: radiusSize,
		backgroundColor: bgColor,
	}
}


export {Table};

// Intended Use
// <Table
// 	// -- Set background color
// 	// translucent
// 	// light
// 	// white

// 	// -- make the radius of the table smaller
// 	// smallRadius
// >
// 
// </Table>

// Another full example
// <Table>
// 	<Row header>
// 		<Cell columnWidth="50%">#</Cell>
// 		<Cell columnWidth="50%">Name</Cell>
// 	</Row>
// 	<Row>
// 		<Cell alignNumber columnWidth="10%">2</Cell>
// 		<Cell columnWidth="30%">Form cell</Cell>
// 	</Row>
// </Table>