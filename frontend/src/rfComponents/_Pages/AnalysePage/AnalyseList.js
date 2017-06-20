import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

import { Div } from "glamorous";
// import { SectionBottomShadow } from "../_Molecules/Section";
// import {Section, SectionTitle} from '../../_Molecules/Cards';
// import { _Palette } from "../_Utils/Colours";
// import { SectionContainer } from "../_Molecules/Section";

import filterAndListAnalyse from './AnalyseList/filterAndListAnalyse';
import AnalyseRequirement from './AnalyseList/AnalyseRequirement';
// import TraceDropdown from "./AnalyseButtons/TraceDropdown";

// const RequirementsContainer = glamorous(SectionContainer)({
// 	width: "100%",
// 	// backgroundColor: _Palette.Background,
// 	display: "block",
// });

@inject("requirementStore", "libraryStore", "uiStore")
@observer
class AnalyseList extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
		groupData: PropTypes.object,
		libraryStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	};

	render() {
		const { requirementStore, uiStore } = this.props;
		
		const groupsOutput = filterAndListAnalyse(
			AnalyseRequirement,
			requirementStore.groupData,
			uiStore
		)

		return (
				<Div
			// <RequirementsContainer>				
			// </RequirementsContainer>
					// height="100%"
					// height="86.5vh" // This needs a calc() 100vh - page header - section title bar
					overflowY="scroll"
					
				>
					{groupsOutput}
					
				</Div>
		);
	}
}

export default AnalyseList;