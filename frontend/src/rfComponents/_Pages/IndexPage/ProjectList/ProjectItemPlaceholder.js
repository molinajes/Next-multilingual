import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { _Palette } from "../../../_Utils/Colours";
import AnimatedDiv from "../../../_Atoms/Animations";
import { Paragraph } from "../../../_Atoms/Headings";
import { Card } from "../../../_Molecules/Cards";
import Icon from "../../../_Molecules/Icons";
import RaisedButton from "../../../_Molecules/Buttons/RaisedButton";

const SummaryDescription = glamorous(Paragraph)({
	paddingTop: 8,
	paddingBottom: 8
});

const ProjectCard = glamorous(Card)({
	cursor: "pointer",
	display: "flex",
	flexDirection: "column",
	alignItems: "center"
});

@inject("projectStore")
@observer class ProjectItemPlaceholder extends Component {
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
							iconName={"np_egg"}
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
					Welcome! It looks like you're new here. Hatch open a new project to get started:
				</SummaryDescription>

				<RaisedButton
					bgColor={_Palette.Mango}
					bgHoverColor={_Palette.MangoActive}
					bgActiveColor={_Palette.MangoActive}
					textColor={_Palette.White}
					textHoverColor={_Palette.White}
					textActiveColor={_Palette.White}
					size={"LARGE2"}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
					onClick={this.onClick}
				>
					Create a Project{" "}
				</RaisedButton>
			</ProjectCard>
		);
	}
}

export default ProjectItemPlaceholder;
