import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { Heading2, SubHeading2 } from "../../../_Atoms/Headings";
import { WindowBlock, WindowContainer } from "../../../_Atoms/Structure";
import Icon from "../../../_Molecules/Icons";
import { _Palette } from "../../../_Utils/Colours";

import StepOverview from "./StepOverview";
import StepSelector from "./StepSelector";

const UseCaseSection = glamorous(WindowContainer)({
	flex: 1
});

const TitleBlock = glamorous(WindowBlock)({
	display: "flex"
});

@inject("actorStore", "stepStore", "uiStore")
@observer
class UseCaseEditor extends Component {
	static propTypes = {
		stepStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			activeStep: 0
		};
	}

	handleAddStep = () => {
		const { stepStore, actorStore, data } = this.props;
		console.log("did handle add");
		let number = data.children[0].length;
		stepStore.createStep(
			actorStore.actorData[0].persistent_id,
			data.children[0].persistent_id,
			"",
			"",
			number
		);
	};

	render() {
		const { uiStore, data } = this.props;

		if (!data) {
			// Here until we properly select the Use Case
			return null;
		}

		// For now we just take the first Flow as the data source.
		// Gets the steps of the first flow in the UC
		let steps = data.children[0].children;

		// Again, just temporarily grabs the active step to send it to the step overview.
		let stepOverview = steps
			.filter((step, index) => {
				return index === uiStore.activeStep;
			})
			.map(step => {
				return <StepOverview data={step} key={step.persistent_id} />;
			});

		return (
			<UseCaseSection>
				<TitleBlock display="flex" alignItems="flex-end">
					<div>

						<Heading2>
							{data.name}
						</Heading2>
						<SubHeading2>
							{data.text}
						</SubHeading2>
					</div>
					<Icon
						css={{ marginLeft: "auto" }}
						baseColor={_Palette.Orange}
						Size={"Large2"}
						iconName={"np_external_UC"}
					/>
				</TitleBlock>
					{/*<InterfacePanel>
					Interface Library - Drag to create step
				</InterfacePanel>*/}
				<WindowBlock>
					<StepSelector
						steps={steps}
						handleAdd={this.handleAddStep}
					/>
					<Div display="flex" justifyContent="center">
						{stepOverview}
					</Div>
				</WindowBlock>
			</UseCaseSection>
		);
	}
}
export default UseCaseEditor;