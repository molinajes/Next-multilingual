import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";

import glamorous from "glamorous";
import { BodyText } from "../../../_Atoms/Headings";
import { _Palette } from "../../../_Utils/Colours";
import { _Shadow, _ShadowSoft } from "../../../_Utils/Shadows";
import { _Transition } from "../../../_Utils/Activity";
import Icon from "../../../_Molecules/Icons";

const AssetRow = glamorous.div(() => baseStyles(), props => propStyles(props));

@observer class TraceAsset extends Component {
	static propTypes = {
		active: PropTypes.bool,
		name: PropTypes.string,
	};

	render() {
		const {active, name} = this.props;
		
		return <AssetRow active={active}>
				<Icon 
					iconName="np_interface" 
					size="SMALL" 
					colorScheme={active ? "Text" : "TextInactive"}
					/>
				<BodyText>{name}</BodyText>
		</AssetRow>;
	}
}

export default TraceAsset;

const baseStyles = () => {
	return {
		borderRadius: 2,
		backgroundColor: _Palette.LightBg,
		display: "flex",
		margin: 2,
		// margin: "1px 4px 1px 4px",
		border: "1px solid transparent",
		boxShadow: _Shadow.Size0,
		transition: _Transition.Highlight,
		cursor: "pointer",

		':hover': {
			borderColor: _Palette.OrangeInactive,
		}
	};
};

const propStyles = props => {
	let borderColor;
	let shadowSize;
	let bgColor;
	let color;
	if (props.active) {
		borderColor = _Palette.OrangeStrong;
		shadowSize = _ShadowSoft.Size1;
		bgColor = _Palette.Light;
		color = _Palette.TextStrong;
	}

	return {
		backgroundColor: bgColor,
		borderColor: borderColor,
		boxShadow: shadowSize,
		color: color,
	}
}