import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { BodyText } from "../../../../_Atoms/Headings";
import { MarginBlock } from "../../../../_Atoms/Structure";
import Icon from "../../../../_Molecules/Icons";
import Input from "../../../../_Molecules/Input";
import { _Palette } from "../../../../_Utils/Colours";
import { _Size } from "../../../../_Utils/Sizing";


const RequirementTitle = glamorous(BodyText)(
	{
		color: _Palette.TextActive
	},
	props => {
		let textColor;
		if (props.isHovered) textColor = _Palette.TextInactive;
		if (props.isActive) textColor = _Palette.TextStrong;

		return {
			color: textColor
		};
	}
);

@inject("requirementStore")
@observer
class RequirementInput extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			active: false,
			isEditing: false
		};
	}

	onSubmitRequirement = newTitle => {
		const { requirementStore, data } = this.props;
		requirementStore.updateBasic(
			data.persistent_id,
			"requirement",
			newTitle,
			"name"
		);
		this.setEditing(false);
	};

	setEditing = (value) => {
		this.setState({
			isEditing: value
		})
	};

	render() {
		const { data } = this.props;
		const { isEditing } = this.state;

		return (
			<RequirementTitle>
				{isEditing
					? <Input
							addPrompt // TODO: Decide if this should be here | AjH
							autoFocus
							autoSubmit
							colorScheme="Orange"
							isActive={this.state.active}
							isHovered={this.state.hovered}
							value={data.name}
							placeholder="Name Your Requirement"
							onSubmit={this.onSubmitRequirement}
							transparent
						/>
					: <Div
							display="flex"
							flexDirection="row"
							justifyContent="space-between"
							lineHeight="1.6"
							padding={_Size.TINY}
						>
							{/*data.name*/} {/*Preview approach*/} 
						{/* TODO: JH can you check this method of preventing 
							the edit icon from moving to the left of the container 
						when there is no data.name | AjH */}
							{data.name || <div>&nbsp;</div>} {/*New AjH approach*/} 

							<MarginBlock size="tiny" onClick={this.setEditing}>
								<Icon
									// color={_Palette.TextFaint}
									defaultColor={_Palette.TextFaint}
									activeColor={_Palette.Orange}
									hoverColor={_Palette.TextWeak}
									isHover={this.state.hovered}
									// isActive={this.state.active}
									size={"SMALL"}
									iconName={"np_edit"}
								/>
							</MarginBlock>
						</Div>}
			</RequirementTitle>
		);
	}
}

export default RequirementInput;
