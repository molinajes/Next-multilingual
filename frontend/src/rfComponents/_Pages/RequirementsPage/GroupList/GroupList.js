import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous from "glamorous";
import { _Palette } from "../../../_Utils/Colours";
import { WindowBlock } from "../../../_Atoms/Structure";
import { Heading3 } from "../../../_Atoms/Headings";
import { SectionPanel, SectionTitle } from "../../../_Molecules/Section";

import GroupTag from "./GroupTag";

const GroupPanel = glamorous(SectionPanel)({
	borderRight: `2px solid ${_Palette.MangoBg}`,
	width: "240px",
	flex: "0 0 auto",
});

const TitleBlock = glamorous(SectionTitle)({
	display: "flex", // move to parent component
	alignItems: "center",
	backgroundColor: "none" // this will be controleld by props
});

const TitleBlockSpacing = glamorous.div({
	marginRight: "0.5rem"
});

@inject("requirementStore")
@observer
class GroupList extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
	};

	render() {
		const { requirementStore } = this.props;

		const groupData = requirementStore.groupData;

		const groups = groupData.map(group => {
			return (
				<GroupTag groupData={group} key={group.id} />
			);
		});

		return (
			<GroupPanel
				bgColor={_Palette.MangoTint}
			>
				<TitleBlock>
					<TitleBlockSpacing>
						<Heading3>
							Groups
						</Heading3>
					</TitleBlockSpacing>
				</TitleBlock>
				<WindowBlock>
					{groups}
				</WindowBlock>
			</GroupPanel>
		);
	}
}
export default GroupList;
