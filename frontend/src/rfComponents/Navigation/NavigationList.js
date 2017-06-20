import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";

// import CreateProjectButton from "./CreateProjectButton";

import { Div } from "glamorous";
import { BodyText } from "../_Atoms/Headings";
import { _Palette } from "../_Utils/Colours";

import NavigationItem from "./NavigationItem";
import IndexNavigationItem from "./IndexNavigation/IndexNavigationItem";

@inject("uiStore")
@observer
class NavigationList extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		data: PropTypes.array.isRequired,
		location: PropTypes.string,
		onClickOption: PropTypes.func
	};

	handleClickSection = tab => {
		const fn = this.props.onClickOption;
		fn && fn(tab);
	};

	render() {
		const { location, data, uiStore } = this.props;

		const navigationSections = data.map(section => {
			const sectionTabs = section.subTabs.map(tab => {
				if (location === "index") {
					return (
						<IndexNavigationItem
							// TODO: Need to consolidate or separate where this file comes from | AjH
							isActive={
								uiStore.indexNavigationTab === tab.id ||
									uiStore.page === tab.id
							}
							iconName={tab.iconName}
							onClick={() => this.handleClickSection(tab.id)}
							key={tab.id}
						>
							{tab.name}
						</IndexNavigationItem>
					);
				}
				else {
					return (
						<NavigationItem
							// TODO: Need to consolidate or separate where this file comes from | AjH
							isActive={
								uiStore.indexNavigationTab === tab.id ||
									uiStore.page === tab.id
							}
							iconName={tab.iconName}
							onClick={() => this.handleClickSection(tab.id)}
							key={tab.id}
						>
							{tab.name}
						</NavigationItem>
					);
				}
			});

			return (
				<Div
					paddingBottom="16px"
					key={section.id}
					color={_Palette.TextInactive}
				>
					<BodyText>{section.name}</BodyText>
					{sectionTabs}
				</Div>
			);
		});

		return (
			<div>
				{/*<CreateProjectButton />*/}
				{navigationSections}
			</div>
		);
	}
}

export default NavigationList;
