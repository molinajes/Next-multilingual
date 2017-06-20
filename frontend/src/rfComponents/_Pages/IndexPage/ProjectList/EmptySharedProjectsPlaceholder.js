import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { _Palette } from "../../../_Utils/Colours";
import AnimatedDiv from "../../../_Atoms/Animations";
import { BodyText, Paragraph } from "../../../_Atoms/Headings";
import { Card } from "../../../_Molecules/Cards";
import Icon from "../../../_Molecules/Icons";
// import RaisedButton from "../../_Molecules/Buttons/RaisedButton";

const SummaryDescription = glamorous(Paragraph)({
	paddingTop: 8,
	paddingBottom: 8,
	textAlign: "center"
});

const SummaryNote = glamorous(BodyText)({
	textAlign: "center"
});

const ProjectCard = glamorous(Card)({
	cursor: "pointer",
	display: "flex",
	flexDirection: "column",
	alignItems: "center"
});

@inject("projectStore")
@observer class EmptySharedProjectsPlaceholder extends Component {
	static propTypes = {
		projectStore: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			active: false
		};
	}

	onMouseEnter = () => {
		this.setState({
			hovered: true
		})
	}

	onMouseLeave = () => {
		this.setState({
			hovered: false
		})
	}

	onClick = () => {
		this.setState({
			active: true
		}, setTimeout(() => {
			const { projectStore } = this.props;
			projectStore.createProject();
		}, 1000))
	}

	render() {
		// const { projectData } = this.props;

		return (
			<ProjectCard>
				<Div
					paddingLeft={"12px"} // get the egg in the middle
					display={!this.state.active ? "block" : "none"}
				>
					<AnimatedDiv isHover={this.state.hovered}>
						<Icon
							baseColor={_Palette.Orange}
							size={"LARGE3"}
							iconName={"np_shared"}
						/>
					</AnimatedDiv>
				</Div>
				<Div
					paddingLeft={"12px"} // get the egg in the middle
					display={this.state.active ? "block" : "none"}
				>
					<Icon
						baseColor={_Palette.Orange}
						size={"LARGE3"}
						iconName={"np_chicken_egg"}
					/>
				</Div>
				<SummaryDescription>
					It looks like you don't have any Shared projects.
					<br />
					Get invited to a project to view shared projects here.
				</SummaryDescription>
				<SummaryNote>
					You can invite people to collaborate on your own project in the project settings page.
				</SummaryNote>
			</ProjectCard>
		);
	}
}

export default EmptySharedProjectsPlaceholder;
