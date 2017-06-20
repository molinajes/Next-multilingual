import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";
import NavLogo from "../../components/Nav/NavLogo";
import NavigationList from "./NavigationList";

import { NavigationContainer } from "../_Atoms/Structure";
import { Div } from "glamorous";

import indexNavitationList from "./indexNavigationList";

@inject("uiStore")
@observer
class IndexNavigation extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	};

	handleClickOption = option => {
		const { uiStore } = this.props;
		uiStore.setIndexNavigationTab(option);
	};

	render() {
		return (
			<NavigationContainer>
				<Div>
					<NavLogo />
					<NavigationList
						data={indexNavitationList}
						location={"index"}
						onClickOption={this.handleClickOption}
					/>
				</Div>
			</NavigationContainer>
		);
	}
}

export default IndexNavigation;
