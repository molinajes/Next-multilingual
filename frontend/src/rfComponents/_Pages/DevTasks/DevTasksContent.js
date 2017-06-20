import React, { Component } from "react";
// import PropTypes from "prop-types";
import { observer /*inject*/ } from "mobx-react";

import { Heading3 } from "../../_Atoms/Headings";
// SectionBlock: div with margin = 4px
import { SectionBlock } from "../../_Molecules/Section"; 
import { LabelHeading } from "../../_Molecules/Labels/LabelHint"

// @inject('')
@observer
class ProgressPage extends Component {
	static propTypes = {
		
	};

	render() {
		// const {
			
		// } = this.props;
		let groupName = "Group Name"; //The name of the Group of requirements

		let requirementName = "Requirement Name"; // The name of the requirement in a group

		return (
			<div>
				Tasks go here and in subcomponents
				<div>
					<Heading3>
						{groupName}
					</Heading3>
					<SectionBlock>
						<LabelHeading>{requirementName}</LabelHeading>
						<ul>
							<li>
								Interfaces
								<ol>
									<li>List of linked interfaces</li>
								</ol>
							</li>
							<li>
								Business Rules
								<ol>
									<li>List of linked Business Rules</li>
								</ol>
							</li>
							<li>
								Forms
								<ol>
									<li>List of linked Forms</li>
								</ol>
							</li>
							<li>
								Objects
								<ol>
									<li>List of linked Objects</li>
								</ol>
							</li>
						</ul>

					</SectionBlock>
				</div>
			</div>
		);
	}
}

export default ProgressPage;
