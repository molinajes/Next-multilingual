import React, { Component, PropTypes } from "react";
import {observer, inject} from 'mobx-react';

import SubNav from '../Nav/SubNav';
import SubNavTab from '../Nav/SubNavTab';

import ProjectDetails from './ProjectDetails';
import ProjectActivity from './ProjectActivity';
import ProjectReleaseOverview from './ProjectReleaseOverview';
import ProjectSize from './ProjectSize';
import ProjectCompleteness from './ProjectCompleteness';

import pageTitles from '../../assets/pageTitles.json';

@inject('uiStore')
@observer
class ProjectPage extends Component {

	static propTypes = {
		uiStore: PropTypes.object.isRequired
	}

	componentDidMount = () => {
		const {uiStore} = this.props;
		uiStore.setActivePage('overview');
		document.title = pageTitles.overview;
	}

	render() {
		return (
			<div className="main__content">
				<SubNav>
					<SubNavTab title="Details" classExtension="modules">

					</SubNavTab>  
					<SubNavTab title="Activity" classExtension="requirements">

					</SubNavTab>  
					<SubNavTab title="Overview" classExtension="linkedComponents">

					</SubNavTab>            
				</SubNav>
				<div className="project__content">
					<div className="project__details">
						<ProjectDetails />
					</div>
					<div className="project__activity">
						<ProjectActivity />
						<ProjectReleaseOverview />
					</div>
					<div className="project__overview">
						<ProjectSize />
						<ProjectCompleteness />
					</div>
				</div>
			</div>
		)
	}

}

export default ProjectPage;
