import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";
import glamorous from "glamorous";

import { _Palette } from "../../../_Utils/Colours";
import { Heading4 } from "../../../_Atoms/Headings";
import { WindowBlock, WindowTint } from "../../../_Atoms/Structure";

import UseCaseTile from "./UseCaseTile";

const Sidebar = glamorous(WindowTint)({
	maxWidth: "200px",
	borderRight: `2px solid ${_Palette.MangoBg}`,
});

@observer class PackageSidebar extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		onClickUseCase: PropTypes.func.isRequired,
		currentUseCase: PropTypes.string.isRequired
	};

	render() {
		const { data, onClickUseCase, currentUseCase } = this.props;

		const useCases = data.children.map(useCase => {
			return (
				<UseCaseTile
					data={useCase}
					onClickUseCase={onClickUseCase}
					isActive={useCase.persistent_id === currentUseCase}
					key={useCase.persistent_id}
				/>
			);
		});

		return (
			<Sidebar bgColor={_Palette.MangoTint}>
				<WindowBlock>
					<Heading4>
						{data.name}
					</Heading4>
					{/* 
								What is this doing here?
								<SubHeading2>
									{data.text}
								</SubHeading2>*/}
					{useCases}
				</WindowBlock>
			</Sidebar>
		);
	}
}
export default PackageSidebar;