import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";
import ProjectItemTitle from "./ProjectItemTitle";

import glamorous from "glamorous";
import { BodyText } from "../../../_Atoms/Headings";
import { Card } from "../../../_Molecules/Cards";

const SummaryDescription = glamorous(BodyText)({
	paddingTop: 8,
	paddingBottom: 8
});

const ProjectCard = glamorous(Card)({
	cursor: "pointer",
	display: "flex",
	flexDirection: "column"
});

@inject("mainStore")
@observer
class LibraryItem extends Component {
	static propTypes = {
		libraryData: PropTypes.object,
		// userStore: PropTypes.object.isRequired,
		mainStore: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			active: false
		};
	}

	onMouseEnter = () => {
		this.setState({ hovered: true });
	};

	onMouseLeave = () => {
		this.setState({ hovered: false });
	};

	handleClick = () => {
		// const { mainStore, library } = this.props;
		// mainStore.setProject(library.id);
	};

	render() {
		const { libraryData } = this.props;

		return (
			<ProjectCard
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				onClick={this.handleClick}
			>
				<ProjectItemTitle
					projectName={libraryData.name}
					isHovered={this.state.hovered}
				/>
				<SummaryDescription>
					{libraryData.description}
				</SummaryDescription>
			</ProjectCard>
		);
	}
}

export default LibraryItem;
