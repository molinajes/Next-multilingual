import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";

import indexNavigationList from "../../../Navigation/indexNavigationList";
import { Heading3, SubHeading3 } from "../../../_Atoms/Headings";
import {
	SectionBottomShadow,
	SectionBlock,
	SectionPanel,
	SectionTitle
} from "../../../_Molecules/Section";

import ProjectItem from "./ProjectItem";
import LibraryItem from "./LibraryItem";
import ProjectItemPlaceholder from "./ProjectItemPlaceholder";
import EmptySharedProjectsPlaceholder from "./EmptySharedProjectsPlaceholder";


const ProjectListContainer = glamorous.div({
	overflowY: "scroll",
	flex: "1 1 auto"
});

const ProjectSectionTitle = glamorous(SectionTitle)({
	display: "flex"
});

@inject("libraryStore", "uiStore", "userStore")
@observer
class ProjectList extends Component {
	static propTypes = {
		libraryStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		userStore: PropTypes.object.isRequired
	};

	render() {
		const { libraryStore, uiStore, userStore } = this.props;

		let listOutput = renderListItems(
			uiStore.indexNavigationTab,
			userStore,
			libraryStore
		);

		if (listOutput.length === 0) {
			listOutput = uiStore.indexNavigationTab === "shared"
				? <EmptySharedProjectsPlaceholder />
				: <ProjectItemPlaceholder />;
		}

		const listDetails = getListDetails(uiStore.indexNavigationTab);

		return (
			<SectionPanel>
				<ProjectSectionTitle>
					<SectionBlock>
						<Heading3>
							{listDetails.name}
						</Heading3>
					</SectionBlock>
					<SectionBlock>
						<SubHeading3>
							{listDetails.description}
						</SubHeading3>
					</SectionBlock>
				</ProjectSectionTitle>
				<ProjectListContainer>
					<Div
						minWidth="560px"
						width="60%"
						marginLeft="auto"
						marginRight="auto"
					>
						{listOutput}

					</Div>

				</ProjectListContainer>
				<SectionBottomShadow />
			</SectionPanel>
		);
	}
}

export default ProjectList;

const renderListItems = (tab, userStore, libraryStore) => {
	if (tab === "shared") {
		return userStore.followsList.map(project => {
			return <ProjectItem projectData={project} key={project.id} />;
		});
	} else if (tab === "featured") {
		return libraryStore.libraryData.map(library => {
			return <LibraryItem libraryData={library} key={library.id} />;
		});
	} else {
		return userStore.projectsList.map(project => {
			return <ProjectItem projectData={project} key={project.id} />;
		});
	}
};

const getListDetails = tab => {
	// Flatten to all subtabs.
	const flattenedArray = indexNavigationList.reduce((output, item) => {
		return output.concat(item.subTabs);
	}, []);
	let details;
	if (tab && tab !== "") {
		details = flattenedArray.find(subTab => subTab.id === tab);
	} else {
		details = flattenedArray.find(subTab => subTab.id === "latest");
	}
	return {
		name: (details && details.name) || "",
		description: (details && details.description) || ""
	};
};
