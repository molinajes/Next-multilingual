import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { _Palette } from "../../../_Utils/Colours";
import { Heading3 } from "../../../_Atoms/Headings";
import { LabelHeading } from "../../../_Molecules/Labels/LabelHint";
import Input from "../../../_Molecules/Input";
import RaisedButton from "../../../_Molecules/Buttons/RaisedButton";
import {
	SectionBlock,
	SectionPanel,
	SectionTitle
} from "../../../_Molecules/Section";

import AddRule from "./AddRule";
import AddIface from "./AddIface";
import AddForm from "./AddForm";
import AddObject from "./AddObject";

const AddAssetPanel = glamorous(SectionPanel)({
	maxWidth: "300px",
	// Should we have a utils file with variables for the
	// length of common components?
	borderLeft: `2px solid ${_Palette.OrangeBg}`
});

@inject("ruleStore", "formStore", "objectStore", "ifaceStore", "uiStore")
@observer
class AnalysePage extends Component {
	static propTypes = {
		assetName: PropTypes.string,
		uiStore: PropTypes.object.isRequired,
		componentType: PropTypes.string
	};

	render() {
		const { assetName, componentType } = this.props;

		let addSpecificAsset;

		switch (componentType) {
			case "iface":
				addSpecificAsset = <AddIface />;
				break;
			case "rule":
				addSpecificAsset = <AddRule />;
				break;
			case "form":
				addSpecificAsset = <AddForm />;
				break;
			case "object":
			default:
				// TODO: Set a better default | AjH
				addSpecificAsset = <AddObject />;
				break;
		}

		return (
			<AddAssetPanel bgColor={_Palette.OrangeTint}>
				<SectionTitle bgColor={_Palette.OrangeTint}>
					<Heading3>
						Add {assetName}
					</Heading3>
				</SectionTitle>
				<SectionBlock size="SMALL">
					<Div>
						<LabelHeading colorScheme="Orange">Name</LabelHeading>
						<Input
							addPrompt
							autoFocus
							autoSubmit
							colorScheme={"Orange"}
							// isActive={this.state.active}
							// isHovered={this.state.hovered}
							// value={"Add an asset"}
							placeholder={`Name your ${componentType}`}
							// onSubmit={this.onSubmitRequirement}
						/>
					</Div>
				</SectionBlock>
				{componentType === "rule"
					? null
					: <SectionBlock size="SMALL">
							<Div>
								<LabelHeading colorScheme="Orange">
									Description
								</LabelHeading>
								<Input
									addPrompt
									autoFocus
									autoSubmit
									colorScheme="Orange"
									textarea
									// isActive={this.state.active}
									// isHovered={this.state.hovered}
									// value={"Add an asset"}
									placeholder={`What does this ${componentType} do?`}
									// onSubmit={this.onSubmitRequirement} // change onsubmit for rule and other components
								/>
							</Div>
						</SectionBlock>}
				<SectionBlock size="SMALL">
					{addSpecificAsset}
				</SectionBlock>
				{/*Removed link components because it was a burden to link before creating an asset*/}
				{/*<SectionBlock size="MEDIUM">
					<Div>
						<LabelHint colorScheme="Orange">
							Link to requirements
						</LabelHint>
					</Div>
				</SectionBlock>*/}
				<SectionBlock size="MEDIUM">
					<Div display="flex" justifyContent="center">
						<RaisedButton
							// -- Set the Size of the button
							size={"MEDIUM"} // "TINY" "SMALL" "MEDIUM" "LARGE1"
							// -- Set event handlers
							// onClick={onClick}
							// onMouseEnter={() => console.log('Mouse Enter')}

							// -- Set a color Scheme that defaults 3 states.
							colorScheme={"Orange"} // "Yellow" "Orange" "Mango" "Primary" "Light"

							// -- Make the button text either an external or internal link
							// externalLink={'https://www.google.com'}
							// link={'/app/model'}

							// -- Force override of state
							// forceHover={true}
							// forceActive={isActive}

							// -- set width = "100%"
							fullWidth
							// -- Set justifyCenter to center contents
							justifyCenter
						>
							Add {assetName}
						</RaisedButton>
					</Div>
				</SectionBlock>

			</AddAssetPanel>
		);
	}
}

export default AnalysePage;