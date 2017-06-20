import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import glamorous from "glamorous";
import { LabelHint } from "../../../../_Molecules/Labels/LabelHint";
import { _Palette } from "../../../../_Utils/Colours";
import { _Size } from "../../../../_Utils/Sizing";
import { _ShadowSoft } from "../../../../_Utils/Shadows";
import { SectionBlock, SectionCentring, SectionDetails } from "../../../../_Molecules/Section";
import { CardRequirement } from "../../../../_Molecules/Cards";

import RequirementInput from "./RequirementInput";

const RequirementContainer = glamorous.div({
	display: "flex",
});

const RequirementCardContainer = glamorous(SectionBlock)(
	{
		flex: '0 0 auto',
		width: "480px",
	},
	props => {
		if (props.isDetail) {
			return {
				paddingLeft: _Size.LARGE1
			}
		}
	}
);

const RequirementCard = glamorous(CardRequirement)(
	// This is a temporary name
	{
		cursor: "grab",
		minHeight: "44px"
	},
	props => ({
		backgroundColor: props.isDetail ? _Palette.Light : null,
		boxShadow: props.isDetail ? _ShadowSoft.Size1 : null
	})
);

// const MetaDetails = glamorous(SectionBlock)(
// 	{
// 		color: _Palette.TextFaint,
// 		textAlign: "right",
// 		width: 48,
// 		marginLeft: "auto",
// 	},
// 	props => {
// 		let textColor;
// 		if (props.isHovered) textColor = _Palette.TextWeak;
// 		if (props.isActive) textColor = _Palette.TextInactive;

// 		return {
// 			color: textColor
// 		};
// 	}
// );

@inject("requirementStore")
@observer
class Requirement extends Component {
	static propTypes = {
		requirementData: PropTypes.object,
		isDetail: PropTypes.bool,

		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		isOver: PropTypes.bool.isRequired,

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
		const {
			isDetail,
			requirementData,
			connectDragSource,
			connectDragPreview,
			connectDropTarget,
			isDragging
		} = this.props;

		let opacity = isDragging ? 0.2 : 1;

		return connectDragPreview(
			<div style={{ opacity }}>
				{connectDragSource(
					connectDropTarget(
						<div>
							<RequirementContainer
								onMouseOver={this.setHover}
								onMouseLeave={this.resetHover}
								onClick={this.toggleActive}
							>
								<SectionCentring>
									<SectionDetails 
										isHovered={this.state.hovered}
										size="TINY"
										> {/* TODO: Need to componentize this and add to create requirement | AjH */}
										<LabelHint>24/05/17</LabelHint>
										<LabelHint>R-1234</LabelHint>
									</SectionDetails>
								</SectionCentring>
								<RequirementCardContainer
									size="TINY"
									isDetail={isDetail}							
								>
									<RequirementCard isDetail={isDetail}>
										<SectionBlock size="TINY">
											<RequirementInput
												data={requirementData}
											/>
										</SectionBlock>
									</RequirementCard>
								</RequirementCardContainer>
								<SectionCentring>

								<SectionDetails
									onRight
									size="TINY"
									isHovered={this.state.hovered}
								>

								</SectionDetails>
								</SectionCentring>
							</RequirementContainer>
						</div>
					)
				)}
				{this.props.children}
			</div>
		);
	}
}

export default Requirement;
