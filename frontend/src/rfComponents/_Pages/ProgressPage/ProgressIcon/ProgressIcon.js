// TODO: Add a template example for progressIcon  | AjH
import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import glamorous from "glamorous";
import Icon from "../../../_Molecules/Icons";
import {_Palette} from "../../../_Utils/Colours";
import {_Size} from "../../../_Utils/Sizing";

const ProgressIconBg = glamorous.div(() => baseStyles(), props => propStyles(props));

// this is a temporary style before a permanent solution is there
// const ProgressIconBg1 = glamorous.div({
// 	backgroundColor: _Palette.Orange,
// 	backgroundImage: `radial-gradient(circle at top right, ${_Palette.Yellow} 40%, ${_Palette.Orange}, ${_Palette.Mango})`,
// 	// backgroundImage: `radial-gradient(circle at top right, ${_Palette.Yellow}, ${_Palette.Orange}, ${_Palette.Mango}`,
// 	borderRadius: "50%",
// 	height: 32,
// 	width: 32,
// 	margin: _Size.TINY,
// 	padding: 2,
// });

const WhiteBackground = glamorous.div({
	backgroundColor: _Palette.White,
	borderRadius: "50%",
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: 2,
})

@observer
class ProgressIcon extends Component {
	static propTypes = {
		iconName: PropTypes.string.isRequired,
		size: PropTypes.string,
	}

	render() {
		const { iconName, size } = this.props;
		return (
			<ProgressIconBg size={size}>
				<WhiteBackground>
					<Icon 
						iconName={iconName}
						size={size || "MEDIUM"}
						/>
				</WhiteBackground>
			</ProgressIconBg>
		);
	}
}

export default ProgressIcon;

const baseStyles = () => {
	return {
		backgroundColor: _Palette.OrangeStrong,
		backgroundImage: `radial-gradient(circle at top right, ${_Palette.Yellow} 40%, ${_Palette.Orange}, ${_Palette.Mango})`,
		// backgroundImage: `radial-gradient(circle at top right, ${_Palette.Yellow}, ${_Palette.Orange}, ${_Palette.Mango}`,
		borderRadius: "50%",
		height: 32,
		width: 32,
		margin: _Size.TINY,
		padding: 2,
	}
}

const propStyles = props => {
	let iconSize;
	if (props.size === "SMALL") {
		iconSize = 24;
	}

	return {
		height: iconSize,
		width: iconSize,
	}
}
