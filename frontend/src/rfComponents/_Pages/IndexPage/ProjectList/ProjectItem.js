import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";
import ProjectItemTitle from "./ProjectItemTitle";

import glamorous, { Div } from "glamorous";
import { Label, Paragraph } from "../../../_Atoms/Headings";
import { Card } from "../../../_Molecules/Cards";

import LabelWithIcon from "../../../_Molecules/Labels/LabelWithIcon";

const SummaryDescription = glamorous(Paragraph)({
	paddingTop: 8,
	paddingBottom: 8
});

const InformationHeading = glamorous(Label)({
	// paddingRight: 16
	display: "flex",
	flexDirection: "row"
});

const ProjectCard = glamorous(Card)({
	cursor: "pointer",
	display: "flex",
	flexDirection: "column"
});

const ProjectInformation = glamorous.div({
	display: "flex"
});

const InformationSection = glamorous.div({
	flex: "1 0 0",
	display: "flex",
	flexDirection: "column"
});

@inject("mainStore")
@observer
class ProjectItem extends Component {
	static propTypes = {
		projectData: PropTypes.object,
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
		const { mainStore, projectData } = this.props;
		mainStore.setProject(projectData.id);
	};

	render() {
		const { projectData } = this.props;

		const lastChangeDate = new Date(
			projectData.changes.lastchange
		).toDateString();
		const numberChanges = projectData.changes.number;

		const owners = projectData.users.owners.reduce((output, owner) => {
			return output.concat(
				<Div key={owner.email}>
					{`${owner.firstname} ${owner.lastname}`}
				</Div>
			);
			// }
		}, []);

		const followers = projectData.users.followers.map(owner => {
			return (
				<Div key={owner.email}>
					{`${owner.firstname} ${owner.lastname}`}
				</Div>
			);
		});

		return (
			<ProjectCard
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				onClick={this.handleClick}
			>
				<ProjectItemTitle
					projectName={projectData.name}
					isHovered={this.state.hovered}
				/>
				<SummaryDescription>
					{projectData.description}
				</SummaryDescription>
				<ProjectInformation>
					<InformationSection>
						<InformationHeading>
							Last Changed:
						</InformationHeading>
						{lastChangeDate}
					</InformationSection>
					<InformationSection>
						<InformationHeading># Changes:</InformationHeading>
						{numberChanges}
					</InformationSection>
					<InformationSection>
						<LabelWithIcon iconName="np_shared" size={"TINY"}>
							Owner:
						</LabelWithIcon>
						{owners}
					</InformationSection>
					<InformationSection>
						<LabelWithIcon iconName="np_shared" size={"TINY"}>
							Followers:
						</LabelWithIcon>
						{followers}
					</InformationSection>
				</ProjectInformation>
			</ProjectCard>
		);
	}
}

export default ProjectItem;
