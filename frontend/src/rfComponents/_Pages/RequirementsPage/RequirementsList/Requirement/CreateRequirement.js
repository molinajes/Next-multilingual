import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import Input from "../../../../_Molecules/Input";

import glamorous, {Div} from "glamorous";
import { _Palette } from "../../../../_Utils/Colours";
import { _ShadowSoft } from "../../../../_Utils/Shadows";
import { MarginBlock } from "../../../../_Atoms/Structure";
import { CardRequirement } from "../../../../_Molecules/Cards";
import { LabelHint } from "../../../../_Molecules/Labels/LabelHint";
import RoundIconButton from "../../../../_Molecules/Buttons/RoundIconButton";

const RequirementContainer = glamorous.div({
	display: "flex",
	marginLeft: "auto",
	marginRight: "auto",
	maxWidth: "480px"
});

const RequirementMargin = glamorous(MarginBlock)({
	flex: 1
});

const RequirementCard = glamorous(CardRequirement)(
	// This is a temporary name
	{
		cursor: "grab",
		minHeight: "44px"
	},
	props => ({
		backgroundColor: props.isDetail ? _Palette.Light : null,
		boxShadow: props.isDetail ? _ShadowSoft.Size1 : null
	})
);

const LabelPosition = glamorous(LabelHint)({
	marginLeft: 4,
})

@inject("requirementStore")
@observer
class CreateRequirement extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
		groupId: PropTypes.string.isRequired,
		number: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			initValue: '',
			active: false
		}
	}

	handleSubmit = value => {
		const { groupId, requirementStore, number } = this.props;
		console.log('create with value: ', value)
		requirementStore.createRequirement(value, groupId, number);
		this.setState({
			initValue: '',
			active: false
		}, () => {
			console.log(this.addButton)
			this.addButton && this.addButton.focus()
		})
	};

	onClickButton = () => {
		this.setState({
			initValue: '',
			active: true
		})
	}

	render() {
		// const {} = this.props;
		return (
			<RequirementContainer>
			{this.state.active ? 
				<RequirementMargin size="tiny">
					<RequirementCard paddingLeft="3rem">
						<MarginBlock size="small">
							<Input
								addPrompt
								autoFocus
								autoClearOnSubmit
								colorScheme="Orange"
								transparent
								// autoSubmit
								// isActive={this.state.active}
								// isHovered={this.state.hovered}
								value={this.state.initValue}
								placeholder="Type to create a requirement"
								onSubmit={this.handleSubmit}
							/>
						</MarginBlock>
					</RequirementCard>
				</RequirementMargin>
			:

			<Div display="flex" paddingLeft="1.5rem" marginTop="0.5rem" alignItems="center">
				<RoundIconButton 
					colorScheme={'Orange'}
					iconColorScheme="TextInactive"
					iconName={'np_plus'}
					size={'LARGE1'}
					onClick={this.onClickButton}
					inputRef={(inputEl) => {
						// This callback gets passed through as a regular prop
						this.addButton = inputEl
					}}
				/>
				<LabelPosition colorScheme="TextInactive">Add your next idea</LabelPosition>
			</Div>}
			</RequirementContainer>
		);
	}
}

export default CreateRequirement;
