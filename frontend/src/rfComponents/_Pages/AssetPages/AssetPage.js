// TODO: Add a search in the title like Requirements Page | AjH
import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import { Heading3} from "../../_Atoms/Headings";
import {
	SectionBlock,
	SectionBottomShadow,
	SectionContainer,
	SectionPanel,
	SectionTitle
} from "../../_Molecules/Section";

import AddAsset from "./AddAsset/AddAsset";
// import ComponentGroup from "../../../AddComponents/ComponentGroup";
import Interface from "./Interfaces/Interface";
import BusinessRule from "./BusinessRules/BusinessRule";
import Form from "./Forms/Form";
import ObjectCard from "./Objects/ObjectCard";

@inject("ruleStore", "formStore", "objectStore", "ifaceStore", "uiStore")
@observer
class AnalysePage extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		assetType: PropTypes.string.isRequired,
		ruleStore: PropTypes.object,
		formStore: PropTypes.object,
		objectStore: PropTypes.object,
		ifaceStore: PropTypes.object,
	};

	render() {
		const {
			assetType,
			ruleStore,
			formStore,
			objectStore,
			ifaceStore,
			// uiStore
		} = this.props;

		// get active page from uiStore
		// I skipped this step in favour of using uiStore.page

		// switch on the active page to define the variables
		let storeData;
		let componentType;
		let assetName; // should this be replaced with a find function in the subtabs


		// let assetExample;
		let tempList;

		// let specificAsset;

		switch (assetType) {
			case "interfaces":
				storeData = ifaceStore.ifaceData;
				componentType = "iface";
				assetName = "Interface";
				// specificAsset = null;
				tempList = storeData.map(data => {
					return <Interface data={data}/>
				})
				// specificAsset = <Interface />;
				break;
			case "businessrules":
				storeData = ruleStore.ruleData;
				componentType = "rule";
				assetName = "Business Rule";
				tempList = storeData.map(data => {
					return <BusinessRule data={data}/>
				})
				// specificAsset = <BusinessRule />;
				break;
			case "forms":
				storeData = formStore.formData;
				componentType = "form";
				assetName = "Form";
				tempList = storeData.map(data => {
					return <Form data={data}/>
				})
				// specificAsset = <Form />;
				break;
			case "objects":
			default:
				// TODO: Set a better default | AjH
				storeData = objectStore.objectData;
				componentType = "object";
				assetName = "Object";
				tempList = storeData.map(data => {
					return <ObjectCard data={data}/>
				})
				// specificAsset = null;
				break;
		}
		
		return (
			<SectionContainer>
				<SectionPanel>
					<SectionTitle>
						<Heading3>{assetName}s</Heading3>
					</SectionTitle>
					<SectionBlock>					
							{/*<ComponentGroup
							assetName={assetName}
							storeData={storeData}
							componentType={componentType}
						/>*/}
						{tempList}
			{/*<ComponentGroup
							assetName={assetName}
							storeData={storeData}
							componentType={componentType}
							// This is here as an example of the old method
							// needs to be replaced with the specificAsset
						/>*/}
					</SectionBlock>
					<SectionBottomShadow />
				</SectionPanel>
				<AddAsset componentType={componentType} assetName={assetName} />
			</SectionContainer>
		);
	}
}

export default AnalysePage;
