import glamorous from "glamorous";
import { _Size } from "../_Utils/Sizing";
import { _ShadowSoft } from "../_Utils/Shadows";

const _App = {
	maxWidth: "1680px",
	marginRight: "auto",
	marginLeft: "auto",
	height: "100vh",
};

const _ContainerFlex = {
	display: "flex",
	flexDirection: "row"
};

const App = glamorous.div(_App);

const AppContainer = glamorous.div(_App, _ContainerFlex);

let _GridColumn = "160px";

const NavigationContainer = glamorous.nav([
	{
		padding: "8px 0 0 1rem",
		flex: "0 0 148px",
		overflowY: "scroll", 
	}
]);

const PageContainer = glamorous.div( // Part of the page template hierarchy
	{
		flex: '1 1 auto',
		// marginLeft: _GridColumn,
		position: "relative",
		flexDirection: "column",
		minHeight: "100vh",
		display: 'flex',
		paddingTop: 0,
		paddingLeft: _Size.MEDIUM,
		paddingRight: _Size.MEDIUM,
		paddingBottom: 0,
	}
);

const ContentContainer = glamorous.div( // TODO: Remove use of this component | AjH
	{
		flex: '1 1 auto',
		marginLeft: _GridColumn,
		position: "relative",
		flexDirection: "column",
		minHeight: "100vh",
		display: 'flex',
		paddingTop: 0,
		paddingLeft: _Size.MEDIUM,
		paddingRight: _Size.MEDIUM,
		paddingBottom: 0,
	}
);



const WindowContainer = glamorous.section( // Needs to be removed
	'g_WindowContainer',
{
	// backgroundColor: _Palette.Background,
	// backgroundColor: _Palette.BackgroundWindow,
	borderRadius: "4px / 3px",
	boxShadow: _ShadowSoft.Size3,
		// minHeight: "95vh",

	// TODO: Add in locked VH and reconsider bgColor | AjH
});

const WindowTint = glamorous.div(props => ({
	backgroundColor: props.bgColor
}));

const WindowBlock = glamorous.div({ //Needs to be removed
	margin: _Size.SMALL
});

const MarginBlock = glamorous.div( // Potentially remove this component // replaced by SectionBlock
	props => {
		let size;
		if (props.size === 'tiny') size = _Size.TINY/2;
		if (props.size === 'small') size = _Size.SMALL/2;
		if (props.size === 'medium') size = _Size.MEDIUM/2;
		if (props.size === 'large1') size = _Size.LARGE1/2;
		return {
			margin: size,
		}
})

export {
	ContentContainer,
	MarginBlock,
	NavigationContainer,
	App,
	AppContainer,
	PageContainer,
	WindowContainer,
	WindowTint,
	WindowBlock
};