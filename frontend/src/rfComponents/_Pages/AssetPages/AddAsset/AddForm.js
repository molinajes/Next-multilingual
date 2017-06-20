// TODO: Make each checkbox row toggle the checkbox | AjH
import React, { Component } from "react";
import { observer } from "mobx-react";

import glamorous from "glamorous";
import { BodyText } from "../../../_Atoms/Headings";
import { LabelHeading } from "../../../_Molecules/Labels/LabelHint";
import Checkbox from "../../../_Molecules/Switches/Checkbox";
import { SectionBlock } from "../../../_Molecules/Section";

const CheckboxFieldName = glamorous(BodyText)({
	paddingLeft: 8,
})

const FieldNameRow = glamorous.div({
	display: "flex",
	marginBottom: 8,
})

@observer class AddForm extends Component {
	static propTypes = {};

	render() {
		return (
			<div>
				<LabelHeading colorScheme="Orange">
					Add any common form fields:
				</LabelHeading>
				<div>
					<SectionBlock size="SMALL">
						<FieldNameRow>
							<Checkbox />
							<CheckboxFieldName>First Name</CheckboxFieldName>
						</FieldNameRow>
						<FieldNameRow>
							<Checkbox />
							<CheckboxFieldName>Last Name</CheckboxFieldName>
						</FieldNameRow>
						<FieldNameRow>
							<Checkbox />
							<CheckboxFieldName>Email</CheckboxFieldName>
						</FieldNameRow>
						<FieldNameRow>
							<Checkbox />
							<CheckboxFieldName>Phone Number</CheckboxFieldName>
						</FieldNameRow>
						<FieldNameRow>
							<Checkbox />
							<CheckboxFieldName>Password</CheckboxFieldName>
						</FieldNameRow>
					</SectionBlock>
				</div>
			</div>
		);
	}
}

export default AddForm;