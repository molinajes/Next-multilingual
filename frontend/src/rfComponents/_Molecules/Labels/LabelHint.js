// File should be remained Labels or something more representative

import glamorous from 'glamorous';
import { Label, Paragraph } from '../../_Atoms/Headings';
import { _Palette } from "../../_Utils/Colours";

const LabelHint = glamorous(Label)(
	() => baseStyles(),
	props => propStyles(props)
);

const LabelHeading = glamorous(Paragraph)(
	() => baseStyles(),
	props => propStyles(props)
);

export {LabelHeading, LabelHint};

const baseStyles = () => {
	return {
		lineHeight: 1 // maybe reset line height here so it can be positioned another way
	};
};


const propStyles = props => {

// TODO: Create a way for the heading to be inactive or active | AjH
// Maybe use this approach _Palette[`${color}${isActive ? 'Active' : 'Inactive'}]

	switch (props.colorScheme) {
		case "Yellow":
			return {
				color: _Palette.YellowActive,
			};
		case "Orange":
			return {
				color: _Palette.OrangeActive,
			};
		case "Mango":
			return {
				color: _Palette.MangoActive,
			};
		case "Primary":
			return {
				color: _Palette.PrimaryActive,
			};
		case "Text":
			return {
				color: _Palette.TextActive,
			};
		case "TextInactive":
			return {
				color: _Palette.TextInactive,
			};
		default:
			return {
				color: undefined,
			};
	}

}

