// page
import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import { AppContainer, PageContainer } from "../../../_Atoms/Structure";

import ProjectNavigation from "../../../Navigation/ProjectNavigation";
import PageHeader from "../../../Navigation/PageHeader";

import AssetPage from "../AssetPage";


@inject('uiStore')
@observer
class FormPage extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	};

	render() {
		const {
			uiStore,
		} = this.props;
		

		return (
			<AppContainer>
				<ProjectNavigation />
				<PageContainer>
					<PageHeader
						pageName={uiStore.page ? uiStore.page : "Page Title"}
					/>
					{/* Content goes here */}
					<AssetPage assetType={uiStore.page}/>
					{/* Content ends here */}
				</PageContainer>
			</AppContainer>
		);
	}
}

export default FormPage;
