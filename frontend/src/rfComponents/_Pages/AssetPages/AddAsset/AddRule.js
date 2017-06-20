import React, { Component } from 'react';
import {observer} from 'mobx-react';

import { LabelHeading, LabelHint } from "../../../_Molecules/Labels/LabelHint";
import Input from "../../../_Molecules/Input";

@observer
class AddRule extends Component {
	static propTypes = {
		
	}

	render() {
		return (
				<div>
					<LabelHeading colorScheme="Orange">
						Rule definition
					</LabelHeading>
					<Input
						addPrompt
						autoFocus
						autoSubmit
						colorScheme="Orange"
						textarea
						// isActive={this.state.active}
						// isHovered={this.state.hovered}
						// value={"Add an asset"}
						placeholder={`What does this business rule do?`}
						// onSubmit={this.onSubmitRequirement} // change onsubmit for rule and other components
					/>
					<LabelHint colorScheme="Orange">
							Help text for definition
					</LabelHint>
				</div>
		);
	}
}

export default AddRule;
