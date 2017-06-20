import glamorous from 'glamorous';

// // Color
const _PaletteBorder = '#A0A0A0'


const SummaryContainer = glamorous.div(
{
	display: 'flex',
	flexDirection: 'column',
})

const SummaryIcon = glamorous.div(
{
	display: 'inline-block',
})

const SummaryTitle = glamorous.div(
{
	color: 'rgba(35,35,35,0.88)',
	fontSize: 40,
	// paddingLeft: 24,

	fontWeight: 600,
	lineHeight: 1.6,
})

const SummaryDescription = glamorous.p(
{
	color: 'rgba(35,35,35,0.72)',
	fontSize: 16,
	

	paddingLeft: 8,
	paddingRight: 8,

	lineHeight: 1.6,
})



export {
	SummaryContainer,
	SummaryIcon,
	SummaryTitle,
	SummaryDescription,
};