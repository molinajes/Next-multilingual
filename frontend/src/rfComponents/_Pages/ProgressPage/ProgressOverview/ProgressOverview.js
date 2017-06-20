import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import Icon from "../../../_Molecules/Icons";
import { _Palette } from "../../../_Utils/Colours";

import ProgressOverviewStep from "./ProgressOverviewStep";

const StepContainer = glamorous.div({
	alignItems: "flex-end",
	display: "flex",
	// border: "1px dotted black",
	flex: "2"
});

const ArrowContainer = glamorous.div({
	display: "flex",
	alignItems: "center",
	flex: "1",
});

const StepGroup = glamorous.div({
	borderBottom: `1px solid ${_Palette.TextWeak}`,
	color: _Palette.TextWeak,
	textAlign: "center"
});

@inject('uiStore')
@observer
class ProgressOverview extends Component {
	static propTypes = {
		data: PropTypes.array.isRequired,
		uiStore: PropTypes.object.isRequired,
	};

	handleClickStep = step => {
		const {uiStore} = this.props;
		uiStore.setProgressStep(step)
	}

	render() {
		const { data, uiStore } = this.props;
		// const arrow = () => {
		// 	return (
		// 		<ArrowContainer>
		// 			<Icon colorScheme="TextWeak" iconName={"np_rightArrow"} />
		// 		</ArrowContainer>
		// 	);
		// };

		const overviewSteps = data.map(stepGroup => {
			const steps = stepGroup.subTabs.map(step => {
				if (step.id !== "progresspage") {
					return (
						<ProgressOverviewStep
							iconName={step.iconName}
							name={step.name}
							key={step.id}
							onClick={() => this.handleClickStep(step.id)}
							isActive={step.id === uiStore.progressStep}
						/>
					);
				}
			});

			if (stepGroup.id !== "assets") {
				return (
					<Div display="flex" justifyContent="space-around" flex="1" key={stepGroup.id}>
						<Div>
							{stepGroup.stepGroup
								? <StepGroup>
										{stepGroup.stepGroup}
									</StepGroup>
								: null}
							<StepContainer>
								{steps}
							</StepContainer>
						</Div>
						<ArrowContainer>
							<Icon colorScheme="TextWeak" iconName={"np_rightArrow"} />
						</ArrowContainer>
					</Div>
				);
			}
		});

		return (
			<Div display="flex" justifyContent="space-around">
				<Div flex="1"></Div>
				{overviewSteps}
					<StepContainer>
						<ProgressOverviewStep
							iconName={"np_completeReport"}
							name={"Finish"}
							// key={step.id}
						/>
					</StepContainer>
				<Div flex="1"></Div>
			</Div>
		);
	}
}

export default ProgressOverview;