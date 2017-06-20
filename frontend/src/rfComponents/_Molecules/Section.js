// TODO: Pass panel color border as props | AjH
	// fix height on SectionTitle
	// centring might need a width prop?
// Section is a part of the app which holds and organises the functionality on the page
// E.g the list of the requirements and their filters and actions
// E.g Approval stats and approval log
// It is intended that these components will become part of a Page Template for the App

import glamorous from "glamorous";
import { _Palette } from "../_Utils/Colours";
import { _Size } from "../_Utils/Sizing";
import { _Shadow, _ShadowSoft } from "../_Utils/Shadows";

// SectionContainer is the main content on a page e.g. Groups and Requirements, Approval and Share
const SectionContainer = glamorous.section("g_SectionContainer", {
	borderRadius: "4px / 3px",
	boxShadow: _Shadow.Size2,
	height: "100%",
	display: "flex",
	position: "relative"
});

// SectionPanel is a column (or row) in the SectionContainer and is used for Groups, RequirementsList etc..
const SectionPanel = glamorous.div(
	{
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: _Palette.Background,
		height: "100%",
		flex: "1 1 0",
		boxShadow: _ShadowSoft.Size0,
		position: "relative"
	},
	props => ({
		backgroundColor: props.bgColor
	})
);

// SectionTitle separates the title and actions
const SectionTitle = glamorous.div(
	{
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		minHeight: 42,
		boxShadow: `0 2px 2px ${_Palette.ShadowSoft}`, // TODO: This needs to be controlled by props | AjH
		backgroundColor: "#f6f6f6", // TODO: Create a variable in _Palette | AjH
		padding: _Size.TINY,
		position: "relative"
	},
	props => ({
		backgroundColor: props.bgColor
	})
);

// SectionCentringContainer - used to centre an element within a section
const SectionCentring = glamorous.div({
	flex: "1 0 auto",
	display: "flex",
});

// Goes at the bottom on shadows to add depth to the vh-fixed containers
const SectionBottomShadow = glamorous.div("g_SectionBottomShadow", {
	height: 24,
	width: "100%",
	background: `linear-gradient(to top,  ${_Palette.ShadowSoft}, transparent)`,
	position: "fixed",
	marginRight: _Size.MEDIUM, // This is not working as intended - the shadow goes to the edge of the screen
	bottom: 0
});

const SectionBlock = glamorous.div(
	{
		// height: "100%",
		margin: _Size.TINY
	},
	props => ({
		margin: _Size[props.size],
		display: props.makeFlex ? "flex" : null, // -- Helper to set display = "flex"
	})
);

// Section Details is used in most floating components and includes date, ID etc..
	// Combine with Section Centring Container to position inline. 
	// Still a work-in-progress
const SectionDetails = glamorous(SectionBlock)(
	{
		color: _Palette.TextFaint,
		textAlign: "right",
		width: 48,
		marginLeft: "auto",
	},
	props => {
		let textColor;
		if (props.isHovered) textColor = _Palette.TextWeak;
		if (props.isActive) textColor = _Palette.TextInactive;

		return {
			marginLeft: props.onRight ? "inherit" : "auto", // defaults to left margin auto
			marginRight: props.onRight ? "auto" : null, // changes to position component on right side
			color: textColor,
			textAlign: props.onRight ? "left" : null,
		};
	}
);

// const Section

export {
	SectionBlock,
	SectionBottomShadow,
	SectionCentring,
	SectionContainer,
	SectionDetails,
	SectionPanel,
	SectionTitle
};