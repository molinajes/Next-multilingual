import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous, { Div } from "glamorous";
import { _Palette } from "../../../_Utils/Colours";
import { _Size } from "../../../_Utils/Sizing";
import { _ShadowSoft } from "../../../_Utils/Shadows";
// import { MarginBlock } from "../../../_Atoms/Structure";
import { CardRequirement } from "../../../_Molecules/Cards";
import { SectionBlock } from "../../../_Molecules/Section";
import { LabelHint } from "../../../_Molecules/Labels/LabelHint";

import TraceLinkButtonList from "../AnalyseButtons/TraceLinkButtonList";

const RequirementContainer = glamorous.div({
	display: "flex",
	marginLeft: "auto",
	marginRight: "auto",
	maxWidth: "480px"
});

const RequirementMargin = glamorous(SectionBlock)({
	flex: 1
});

const RequirementCard = glamorous(CardRequirement)(
	// This is a temporary name
	{
		boxShadow: _ShadowSoft.Size1,
		cursor: "pointer",
		minHeight: "44px"
	},
	props => ({
		backgroundColor: props.isDetail ? _Palette.Light : null,
		boxShadow: props.isDetail ? _ShadowSoft.Size0 : null
	})
);

const MetaDetails = glamorous(SectionBlock)(
	{
		textAlign: "right",
		color: _Palette.TextFaint
	},
	props => {
		let textColor;
		if (props.isHovered) textColor = _Palette.TextWeak;
		if (props.isActive) textColor = _Palette.TextInactive;

		return {
			color: textColor
		};
	}
);

@inject("requirementStore")
@observer
class AnalyseRequirement extends Component {
	static propTypes = {
		groupData: PropTypes.object,
		requirementData: PropTypes.object,
		isDetail: PropTypes.bool,

		requirementStore: PropTypes.object.isRequired,
		children: PropTypes.any
	};

	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			active: false,
			isEditing: false
		};
	}

	setHover = () => {
		this.setState({ hovered: true });
	};

	resetHover = () => {
		this.setState({ hovered: false });
	};

	render() {
		const { isDetail, requirementData } = this.props;

		return (
			<div>
				<RequirementContainer
					onMouseOver={this.setHover}
					onMouseLeave={this.resetHover}
					onClick={this.toggleActive}
				>
					<MetaDetails size="TINY" isHovered={this.state.hovered}>
						<LabelHint>
							99/99/99
						</LabelHint>
						<LabelHint>R-123</LabelHint>
						{/*!isDetail && <GroupTag groupName={parentGroup.name} />*/}
					</MetaDetails>
					<RequirementMargin
						size="TINY"
						css={{
							marginLeft: isDetail ? _Size.LARGE1 : null
						}}
					>
						<RequirementCard isDetail={isDetail}>
							<SectionBlock size="TINY">
								<Div
									display="flex"
									flexDirection="row"
									justifyContent="space-between"
									lineHeight="1.6"
									// padding={_Size.TINY}
								>
									{requirementData.name}
								</Div>
							</SectionBlock>
						</RequirementCard>
					</RequirementMargin>
					<TraceLinkButtonList requirementData={requirementData} />
				</RequirementContainer>
				{this.props.children}
			</div>
		);
	}
}

export default AnalyseRequirement;