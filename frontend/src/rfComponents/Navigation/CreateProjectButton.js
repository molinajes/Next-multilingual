import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import BaseButton from "../_Molecules/Buttons/BaseButton";
import { _Palette } from "../_Utils/Colours";

@inject("projectStore")
@observer
class CreateProjectButton extends Component {
	static propTypes = {
		projectStore: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			active: false
		}
	}

	onClick = () => {
		const { projectStore } = this.props;
		projectStore.createProject();
	};

	render() {
		return (
			<BaseButton
				iconName={"np_add"}
				textColor={_Palette.Mango}
				onClick={this.onClick}
			>
				Create a project
			</BaseButton>
		);
	}
}

export default CreateProjectButton;
