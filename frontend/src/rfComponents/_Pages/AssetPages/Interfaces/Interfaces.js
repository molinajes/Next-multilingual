// page
import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { Heading3 } from "../../../_Atoms/Headings";
import { AppContainer, PageContainer } from "../../../_Atoms/Structure";
import ProjectNavigation from "../../../Navigation/ProjectNavigation";
import PageHeader from "../../../Navigation/PageHeader";
import {
	SectionBlock,
	SectionBottomShadow,
	SectionContainer,
	SectionPanel,
	SectionTitle
} from "../../../_Molecules/Section";

import AddAsset from "../AddAsset/AddAsset"
import Interface from "./Interface";

const InterfacesGrid = glamorous.div({
	display: "flex",
	flexWrap: "wrap",
	marginLeft: "auto",
	marginRight: "auto",
	// justifyContent: "flex-start",
	maxWidth: "640px",
	// flex: "0 1 auto", 
	// border: "1px dotted black"
})

@inject('uiStore', 'ifaceStore')
@observer
class Interfaces extends Component {
	static propTypes = {
		ifaceStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
	};

	render() {
		const {
			ifaceStore,
			uiStore,
		} = this.props;

		// const storeData = ifaceStore.ifaceData;
		const componentType = "iface";
		const assetName = "Interface";
		// specificAsset = null;
		const interfaces = ifaceStore.ifaceData.map(data => {
			return <Interface data={data}/>
		})
		

		return (
			<AppContainer>
				<ProjectNavigation />
				<PageContainer>
					<PageHeader
						pageName={uiStore.page ? uiStore.page : "Page Title"}
					/>
					{/* Content goes here */}
					<SectionContainer>
						<SectionPanel>
							<SectionTitle>
								<SectionBlock>
									<Heading3>Interfaces</Heading3>
								</SectionBlock>
							</SectionTitle>
							<Div overflowY="scroll">
								<SectionBlock>					
									<Div 
										// display="flex" justifyContent="center"
										>
										<InterfacesGrid>{interfaces}</InterfacesGrid>
									</Div>
												
								</SectionBlock>
								<SectionBottomShadow />
							</Div>
						</SectionPanel>
						<AddAsset componentType={componentType} assetName={assetName} />
					</SectionContainer>
				{/*Add templates option on empty state and possibly all the time*/}
					{/* Content ends here */}
				</PageContainer>
			</AppContainer>
		);
	}
}

export default Interfaces;
