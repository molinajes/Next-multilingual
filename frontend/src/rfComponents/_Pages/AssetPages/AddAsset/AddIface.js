// TODO: Reconsider the copy used on this component | AjH
import React, { Component } from 'react';
import {observer} from 'mobx-react';

import glamorous, { Div } from "glamorous";
import { BodyText } from "../../../_Atoms/Headings";
import { LabelHeading } from "../../../_Molecules/Labels/LabelHint";
import { Card } from "../../../_Molecules/Card/Card";
import Icon from "../../../_Molecules/Icons";
import { _Palette } from "../../../_Utils/Colours";

const UploadInstruction = glamorous(BodyText)({
	color: _Palette.TextWeak,
})

@observer
class AddIface extends Component {
	static propTypes = {
		
	}

	render() {
		return (
			<Div>
				<LabelHeading colorScheme="Orange">
					Upload your interface or view
				</LabelHeading>
				<Card 
					// -- Reduce border radius
					// small

					// -- Set shadow level between 0-4 
					// -- 0: border, 1: subtle, 2: floating element, 
					// -- 3: raised, 4: modal
					shadowLevel="1"

					// -- Set either translucent or white 
					// translucent
					white

					// -- Helper to set display = "flex"
					// makeFlex

					// width="560px"
					// -- Note: set internal margin with SectionBlock or similiar
				>
				<Div height="200px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
					<div>
						<Icon 
							colorScheme="TextWeak"
							iconName="np_uploadInterfaces"
							sizeOverride={"162px"}
						/>
					</div>
					<UploadInstruction>Upload by clicking or dropping a file here</UploadInstruction>
				</Div>
				</Card>
			</Div>
		);
	}
}

export default AddIface;
