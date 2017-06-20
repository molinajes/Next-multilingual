import React, { Component, PropTypes } from "react";
import { observer, inject } from "mobx-react";
import NavLogo from "../../components/Nav/NavLogo";
import NavigationList from './NavigationList';
import ProjectNavigationList from "./ProjectNavigation/ProjectNavigationList";

import {NavigationContainer} from "../_Atoms/Structure";
import { Div } from "glamorous";

@inject('uiStore')
@observer class ProjectNavigation extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
	};


	handleClickOption = (option) => {
		const {uiStore} = this.props;
		uiStore.setPage(option);
	}

	render() {
		
		return (
			<NavigationContainer>
				<Div>
					<NavLogo />
					<NavigationList data={ProjectNavigationList} onClickOption={this.handleClickOption}/>
				</Div>
			</NavigationContainer>
			);
	}
}

export default ProjectNavigation;