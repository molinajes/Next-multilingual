import React, { Component } from "react";
import { observer } from "mobx-react";

import { Div } from "glamorous";
import { Card } from "../../_Molecules/Card/Card";
import { SectionBlock, SectionCentring } from "../../_Molecules/Section";
import Icon from "../../_Molecules/Icons";
import { Cell } from "../../_Molecules/Table/Cell";
import { Row } from "../../_Molecules/Table/Row";
import { Table } from "../../_Molecules/Table/Table";
import { _Palette } from "../../_Utils/Colours";

@observer class ActorTable extends Component {
	static propTypes = {};

	render() {
		return (
			<SectionBlock>
				<SectionBlock>
					<Div display="flex">
						<SectionCentring />
						<Card // -- Reduce border radius
						// small

						// -- Set shadow level between 0-4
						// -- 0: border, 1: subtle, 2: floating element,
						// -- 3: raised, 4: modal
						// shadowLevel="0"

						// -- Set either translucent or white
						// translucent
						// white

						// -- Helper to set display = "flex"
						// makeFlex

						// -- Note: set internal margin with SectionBlock or similiar
						// width="560px"
						>
							<Table>
								<Row header>
									<Cell columnWidth="5%"> </Cell>
									<Cell columnWidth="20%">Name</Cell>
									<Cell columnWidth="40%">Description</Cell>
									<Cell columnWidth="15%">Inherits</Cell>
									<Cell columnWidth="15%">Pre-test</Cell>
									<Cell columnWidth="5%"> </Cell>
								</Row>
								<Row>
									<Cell columnWidth="5%">
										<Icon
											defaultColor={_Palette.TextInactive}
											// activeColor={_Palette.Orange}
											// hoverColor={_Palette.TextWeak}
											// isHover={this.state.hovered}
											// isActive={this.state.active}
											iconName="np_actor"
											size={"MEDIUM"}
										/>
									</Cell>
									<Cell columnWidth="20%">User</Cell>
									<Cell columnWidth="40%">
										Just your everyday user
									</Cell>
									<Cell columnWidth="15%">Inherits</Cell>
									<Cell columnWidth="15%">Pre-test</Cell>
									<Cell columnWidth="5%">
										<Icon
											defaultColor={_Palette.TextInactive}
											// activeColor={_Palette.Orange}
											// hoverColor={_Palette.TextWeak}
											// isHover={this.state.hovered}
											// isActive={this.state.active}
											iconName="np_merge"
											size={"MEDIUM"}
										/>
									</Cell>
								</Row>
							</Table>
						</Card>
						<SectionCentring />
					</Div>
				</SectionBlock>
			</SectionBlock>
		);
	}
}

export default ActorTable;

// <Icon
// 	color={_Palette.TextFaint}
// 	defaultColor={
// 		_Palette.TextFaint
// 	}
// 	// activeColor={_Palette.Orange}
// 	// hoverColor={_Palette.TextWeak}
// 	// isHover={this.state.hovered}
// 	// isActive={this.state.active}
// 	iconName="np_edit"
// 	size={"SMALL"}
// />