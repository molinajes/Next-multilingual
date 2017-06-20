import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";
import glamorous from "glamorous";

import { ContentContainer, AppContainer, WindowContainer } from "../../_Atoms/Structure";
import { SectionHeading } from "../../_Atoms/Headings";
// import { Section } from "../_Molecules/Cards";

import ProjectNavigation from "../../Navigation/ProjectNavigation";

import UseCaseEditor from "./UseCaseEditor/UseCaseEditor";
import PackageSidebar from "./PackageSidebar/PackageSidebar";

const PackageContainer = glamorous(WindowContainer)({
	display: "flex",
	flexDirection: "row",
});

@inject("packageStore", "useCaseStore")
@observer
class ModelPage extends Component {
	static propTypes = {
		packageStore: PropTypes.object.isRequired,
		useCaseStore: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			currentUseCase: 0
		};
	}

	onClickUseCase = id => {
		console.log("set id", id);
		this.setState({
			currentUseCase: id
		});
	};

	render() {
		const { packageStore, useCaseStore } = this.props;

		const currentPackage = packageStore.packageData[1];

		const currentUseCaseData = useCaseStore.useCaseData.find(useCase => {
			return useCase.persistent_id === this.state.currentUseCase;
		});

		return (
			<div>
				<AppContainer>
					<ProjectNavigation />
					<ContentContainer>
						<SectionHeading>
							Use Case Editor
						</SectionHeading>
						<PackageContainer>
							{/*<Div display="flex">
							</Div>*/}
								<PackageSidebar
									onClickUseCase={this.onClickUseCase}
									currentUseCase={this.state.currentUseCase}
									data={currentPackage}
								/>
								<UseCaseEditor data={currentUseCaseData} />
						</PackageContainer>
					</ContentContainer>
				</AppContainer>
			</div>
		);
	}
}
export default ModelPage;