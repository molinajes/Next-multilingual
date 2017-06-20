import React, { Component, PropTypes } from 'react';

import {Div} from "glamorous";
import { Label } from "../../_Atoms/Headings";
import Icon from "../Icons";

class LabelWithIcon extends Component {
	static propTypes = {
		iconName: PropTypes.string.isRequired,
		children: PropTypes.any,
	}

	render() {
		const {iconName, ...other} = this.props;
		return (
			<Div
				display= "flex"
				flexDirection= "row"
			> 
				<Icon
					{...other}
					iconName={iconName}
				/>
				<Label>
					{this.props.children}
				</Label>
			</Div>
		);
	}
}

export default LabelWithIcon;
