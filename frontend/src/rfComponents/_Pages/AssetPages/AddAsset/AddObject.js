import React, { Component } from 'react';
import {observer} from 'mobx-react';

import { Div } from "glamorous";
import { LabelHeading } from "../../../_Molecules/Labels/LabelHint";

@observer
class AddObject extends Component {
	static propTypes = {
		
	}

	render() {
		return (
			<Div>
				<LabelHeading colorScheme="Orange">
					Anything specific to objects?
				</LabelHeading>

			</Div>
		);
	}
}

export default AddObject;
