// Glam components will be created here and then
// the molecule components will be update to match

import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { LabelHint } from "../../../_Molecules/Labels/LabelHint";
import RaisedButton from "../../../_Molecules/Buttons/RaisedButton";
import Input from "../../../_Molecules/Input";
import { _Palette } from "../../../_Utils/Colours";
// import { _ShadowSoft } from "../../_Utils/Shadows";

import TraceAsset from "./TraceAsset";

const AssetContainer = glamorous.div({
	borderRadius: 4,
	backgroundColor: "white", //_Palette.LightBg,
	width: 264,
	maxHeight: 180,
	// boxShadow: _ShadowSoft.Size3,
	position: "absolute",
	right: 0,
	top: "50%",
	marginLeft: "auto",
	marginRight: "auto",
	display: "flex",
	flexDirection: "column",
	boxShadow: `0 2px 2px ${_Palette.ShadowSoft}, 0 8px 16px -2px ${_Palette.ShadowSoft}, inset 0 -4px 4px ${_Palette.ShadowSoft}`, // taken  from size3,
	zIndex: 10
	// overflowY: "hidden"
});

const SearchRow = glamorous.div({
	borderRadius: 4,
	backgroundColor: _Palette.OrangeInactive,
	display: "flex",
	flex: "0 0 auto",
	boxShadow: `0 2px 1px ${_Palette.ShadowSoft}`
});

const TraceLabel = glamorous(LabelHint)({
	margin: 2,
	marginBottom: 1
});

@observer class TraceDropdown extends Component {
	static propTypes = {
		// componentType: PropTypes.object.isRequired,
		// parentData: PropTypes.object.isRequired,
		handleCloseMenu: PropTypes.func.isRequired
	};


	componentDidMount = () => {
		if (this.dropDownInputRef) this.dropDownInputRef.focus();
		if (!document.addEventListener && document.attachEvent) {
			document.attachEvent('onclick', this.handleTouchOutside);
		} else {
			document.addEventListener('click', this.handleTouchOutside);
		}
	}

	handleTouchOutside = (e) => {

		if (this.wrapper && !this.wrapper.contains(e.target)) {	
		console.log('handling outside touch')	
			this.props.handleCloseMenu();
		}
	}

	render() {

		// const {componentType, parentData} = this.props;


		const linkedAssets = (
			<div>
				<TraceLabel colorScheme="TextInactive">Linked</TraceLabel>
				{someData.linked.map(asset => {
					return (
						<TraceAsset active name={asset.name} key={asset.name} />
					);
				})}
			</div>
		);

		const unlinkedAssets = (
			<div>
				<TraceLabel colorScheme="TextInactive">Unlinked</TraceLabel>
				{someData.unlinked.map(asset => {
					return <TraceAsset name={asset.name} key={asset.name} />;
				})}
			</div>
		);

		const creatingAsset = (
			<div>
				<TraceLabel colorScheme="TextInactive">
					Press enter to create:
				</TraceLabel>
				{someData.create.map(asset => {
					return (
						<TraceAsset active name={asset.name} key={asset.name} />
					);
				})}
			</div>
		);

		return (
			<AssetContainer insideRef={ref => this.wrapper = ref}>
				<SearchRow>
					<Div margin="2px" width="100%">
						<Input
							addPrompt
							colorScheme="Orange"
							placeholder="...create new or search"
							fontSize="SMALL"
						/>
					</Div>
					<RaisedButton
						css={{ padding: "4px", margin: "2px" }}
						colorScheme="Light"
						bgActiveColor={_Palette.OrangeInactive}
						iconColorScheme="TextInactive"
						size="MEDIUM"
						iconName={"np_interface"}
						forceActive
						onClick={this.onClickButton}
					/>
				</SearchRow>
				<Div overflowY="scroll" padding="4px">
					{creatingAsset}
					{/*This should only show when typing in the search bar*/}
					{linkedAssets}
					{/*Why are these functions? I don't know how to get it to work another way*/}
					{unlinkedAssets}
				</Div>
			</AssetContainer>
		);
	}
}

export default TraceDropdown;

const someData = {
	create: [
		{
			name: "From search bar"
		}
	],
	linked: [
		{
			name: "Interface One"
		},
		{
			name: "Interface Two"
		}
	],
	unlinked: [
		{
			name: "Unlinked Interface"
		},
		{
			name: "Another Unlinked"
		},
		{
			name: "Thrice Unlinked"
		},
		{
			name: "Unlinked Inter1face"
		},
		{
			name: "Another 1nlinked"
		},
		{
			name: "Thrice Un1linked"
		}
	]
};
