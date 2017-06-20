import glamorous from "glamorous";
import { _Size } from "../_Utils/Sizing";
import { _Palette } from "../_Utils/Colours";
import { _ShadowSoft } from "../_Utils/Shadows";

const SectionContainer = glamorous.div({
	// borderRadius: _Size.tiny,
	backgroundColor: _Palette.Background,
	borderRadius: "4px / 3px",
	// boxShadow: _ShadowSoft.Size2,
	// marginBottom: _Size.LARGE3,
	padding: _Size.MEDIUM,
});

const Section = glamorous(SectionContainer)({
	borderRadius: "8px 8px 4px 3px / 6px 6px 4px 3px",
	width: "100%",
});

const SectionTitle = glamorous.div([
	{
		borderRadius: "8px 8px 0 0 / 6px 6px 0 0",
		borderBottom: `2px ${_Palette.Primary} solid`,
		padding: _Size.TINY,
		margin: _Size.SMALL, 
	}
]);

const Card = glamorous.div({
	backgroundColor: _Palette.Light,
	borderRadius: "4px 2px / 3px 1px",
	boxShadow: _ShadowSoft.Size1,
	// boxShadow: _ShadowSoft.Size2, // Need to choose a shadow size
	padding: _Size.LARGE1, 
	margin: _Size.SMALL, // Shared styled components should not set margin - Netflix guide
});

const CardRequirement = glamorous.div({ // This needs to be merged into Card
	backgroundColor: _Palette.White,
	borderRadius: "3px",
	boxShadow: _ShadowSoft.Size2,
	padding: _Size.SMALL,
	width: '100%', 
});

const CardGroup = glamorous.div({ // This needs a better name
	// backgroundColor: _Palette.Light,
	// borderRadius: "4px 2px / 3px 1px",
	boxShadow: _ShadowSoft.Size0,
	// boxShadow: _ShadowSoft.Size2, // Need to choose a shadow size
	padding: _Size.SMALL,
	margin: _Size.SMALL, 
});

const CardTile = glamorous.div({
	backgroundColor: _Palette.White,
	borderRadius: "4px 2px / 3px 1px",
	boxShadow: _ShadowSoft.Size2,
	padding: _Size.SMALL,
	margin: _Size.SMALL, 
});

const CardThumbnail = glamorous.div({
	backgroundColor: _Palette.Light,
	borderRadius: "4px 2px / 3px 1px",
	boxShadow: _ShadowSoft.Size2,
	padding: _Size.TINY,
},
props => {
	let marginType;
	if (props.marginType === 'list') marginType = `${_Size.SMALL}px 0`;
	if (props.marginType === 'grid') marginType = `${_Size.SMALL}px`;
	return {
		margin: marginType,
	}
},
props => {
	let size;
	if (props.size === 'small') size = _Size.SMALL;
	if (props.size === 'medium') size = _Size.MEDIUM;
	return {
		height: size*9,
		width: size*12,
	}
},
);

export { Card, CardGroup, CardRequirement, CardThumbnail, CardTile, Section, SectionContainer, SectionTitle };