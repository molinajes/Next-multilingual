import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";
import IconPositioned from "../../../../components/Iconic/IconPositioned";
import Icon from "../../../_Molecules/Icons";

import glamorous, { Div } from "glamorous";
import { _Palette } from "../../../_Utils/Colours";

import { ActiveLink, Heading1, Label } from "../../../_Atoms/Headings";

const SummaryTitle = glamorous(Heading1)(
	props => {
		return {
			color: props.isHovered ? _Palette.Orange : undefined
		};
	}
);

const Subtitle = glamorous(Label)(
	// paddingTop: _Size.MEDIUM,
	props => {
		return {
			opacity: props.isHovered ? 1 : 0,
			color: props.isHovered ? _Palette.Orange : undefined
		};
	}
);

@inject("projectStore")
@observer
class ProjectItemTitle extends Component {
	static propTypes = {
		projectStore: PropTypes.object.isRequired,
		isActive: PropTypes.bool,
		isHovered: PropTypes.bool,
		projectName: PropTypes.string
	};

	render() {
		const {
			projectStore,
			projectName,
			isActive,
			isHovered,
			...other
		} = this.props;

		return (
			<Div display="flex" alignItems="center" {...other}>
				<ActiveLink>
					<Div display="flex" alignItems="center" {...other}>
						<SummaryTitle isHovered={isHovered}>
							{projectName}
						</SummaryTitle>
						<Div
						// marginTop="0.875rem"
						>
							<Icon
								isHover={isHovered}
								isActive={isActive}
								size={"SMALL"}
								hoverColor={_Palette.Orange}
								activeColor={_Palette.OrangeActive}
								iconName={"np_external_link"}
							/>
						</Div>

						<Subtitle isHovered={isHovered}>
							Open this project
						</Subtitle>
					</Div>
				</ActiveLink>
				<Div marginLeft="auto">
					<IconPositioned
						iconSize="56"
						iconicType={`${projectStore.projectDetails.project_icon || "fire"}-md`}
						onClick={this.handleClick}
					/>

				</Div>
			</Div>
		);
	}
}

export default ProjectItemTitle;
