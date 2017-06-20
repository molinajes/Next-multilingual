// Todo: fix props, add a fallback if pageDetails doesn't load
// need to confirm icon height, add in help button 
// make compatible or separated from index page header :)

import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';


import glamorous from 'glamorous';
import { SectionHeading, BodyText } from "../_Atoms/Headings";
import Icon from "../_Molecules/Icons";
import {SectionBlock} from "../_Molecules/Section";
import { _Palette } from "../_Utils/Colours";

import ProjectNavigationList from "../Navigation/ProjectNavigation/ProjectNavigationList";


const PageHeaderContainer = glamorous.div({
	display: 'flex',
	alignItems: 'center',
}) 

const PageHeaderTitle = glamorous(SectionHeading)({
	marginBottom: "0.5rem",
	marginTop: "0.5rem",
})

const PageDescription = glamorous(BodyText)({
	// fontWeight: '300',
	maxWidth: 440,
	maxHeight: 34,
	marginRight: "0.5rem",
	marginTop: "0.5rem",
	marginBottom: "0.5rem",
	lineHeight: 1.2,
	overflowY: 'hidden',
	textAlign: "right",
	color: _Palette.TextWeak,
	marginLeft: "auto",
})

const PageIcons = glamorous.div({
	// maxHeight: 52,
})

@observer
class PageHeader extends Component {
	static propTypes = {
		children: PropTypes.node,
		// iconName: PropTypes.string.isRequired,
		pageName: PropTypes.string.isRequired,
	}


	render() {
		const { pageName } = this.props;

		function findPageDetails(tab) {
			return tab.id === pageName;
		}

		const projectSubTabs = ProjectNavigationList.reduce((output, item) => {
			return output.concat(item.subTabs);
		}, []);

		let pageDetails = projectSubTabs.find(findPageDetails);

		pageDetails = pageDetails ? pageDetails : {
			name: "Welcome back,",
			pageHeadingIcon: 'np_launch_project',
			pageHeadingDescription: 'Choose a project below to get started'
		}

		return (
			<PageHeaderContainer>
						<PageHeaderTitle>
							{/* TODO: JH can you create a more resilient fallback here | AjH */}
							{pageDetails.name}
						</PageHeaderTitle>
						<PageDescription>
							{pageDetails.pageHeadingDescription}
						</PageDescription>
						<PageIcons>
							<SectionBlock>
								<Icon 
								colorScheme="TextWeak"
								sizeOverride='44px'
								iconName={pageDetails.pageHeadingIcon}
								/>
							</SectionBlock>
						</PageIcons>
					</PageHeaderContainer>
		);
	}
}

export default PageHeader;
