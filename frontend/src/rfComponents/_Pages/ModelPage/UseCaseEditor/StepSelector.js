import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { CardTile } from "../../../_Molecules/Cards";

// Local Styled Components
let StepButton = glamorous(CardTile)(
	{
		width: "120px",
		height: "80px",
		flexShrink: "0"
	},
	props => ({
		backgroundColor: props.isActive ? "orange" : ""
	})
);

@inject("uiStore")
@observer
class StepSelector extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		steps: PropTypes.array.isRequired,
		handleAdd: PropTypes.func.isRequired
	}

	handleClickStepNumber = index => {
		// If passed -1 we create a new step.
		const { uiStore } = this.props;
		if (index === -1) {
			this.handleCreateStep();
		} else {
			uiStore.setActiveStep(index);
		}
	}

	handleCreateStep = () => {
		const { steps, uiStore } = this.props;
		let number = steps.length;
		uiStore.setActiveStep(number);
		this.props.handleAdd();
	}

	render() {
		const { steps, uiStore } = this.props;

		// First generate a list of the selectors with the active one set to isActive
		let stepButtons = steps.map((step, index) => {
			return (
				<StepButton
					isActive={index === uiStore.activeStep}
					onClick={() => this.handleClickStepNumber(index)}
				>
					{index + 1}
				</StepButton>
			);
		});

		// Also create a button to create a new step and pass it -1
		let newStepButton = (
			<StepButton onClick={() => this.handleClickStepNumber(-1)}>
				+
			</StepButton>
		);

		return (
				<Div display="flex" flexDirection="row" overflowX="scroll">
					{stepButtons}
					{newStepButton}
				</Div>
		);
	}
}

export default StepSelector;
