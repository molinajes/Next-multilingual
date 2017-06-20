import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";

import glamorous from "glamorous";

import TraceLinkButton from "./TraceLinkButton";

const FlexContainer = glamorous.div({
	alignItems: "center",
	display: "flex",
	textAlign: "center"
});

const AnalyseTitleButtons = glamorous(FlexContainer)({});

@observer class TraceLinkButtonList extends Component {
	static propTypes = {
		requirementData: PropTypes.object.isRequired
	};

	render() {

		const {requirementData} = this.props;

		const analyseAssets = [
			{
				id: "iface",
				name: "Interfaces",
				iconName: "np_interface"
			},
			{
				id: "rule",
				name: "Business Rules",
				iconName: "np_businessRule"
			},
			{
				id: "form",
				name: "Forms",
				iconName: "np_form"
			},
			{
				id: "object",
				name: "Objects",
				iconName: "np_object"
			},
			{
				id: "useCase",
				name: "Use Case Editor",
				iconName: "np_useCaseScreen"
			}
		];

		const analyseButtons = analyseAssets.map(asset => {
			return (
				<TraceLinkButton
					componentType={asset.id}
					data={requirementData}
					key={asset.id}
				/>
			);
		});

		return (
			<AnalyseTitleButtons>
				{analyseButtons}
			</AnalyseTitleButtons>
		);
	}
}

export default TraceLinkButtonList;
