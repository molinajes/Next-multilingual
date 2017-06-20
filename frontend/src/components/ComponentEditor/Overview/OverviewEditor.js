import React, { Component, PropTypes } from 'react';
import {withRouter} from 'react-router';
import {observer, inject} from 'mobx-react';
import axios from 'axios';

import IconPositioned from '../../Iconic/IconPositioned';
import ProjectActivity from '../../ProjectPage/ProjectActivity';
import ProjectReleaseOverview from '../../ProjectPage/ProjectReleaseOverview';
import ProjectDetails from '../../ProjectPage/ProjectDetails';
import ProjectIconSelector from '../../ProjectPage/ProjectIconSelector';

import DeleteObject from '../../Delete/DeleteObject';

@inject('projectStore', 'uiStore', 'mainStore', 'userStore')
@withRouter
@observer
class OverviewEditor extends Component {
	static propTypes = {
		projectStore: PropTypes.object.isRequired,
		mainStore: PropTypes.object.isRequired,
		userStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired
	}	

	handleClickDelete = () => {
		const {projectStore, mainStore, uiStore, router} = this.props;
		uiStore.setIsLoadingData(true);
		axios.post('/app/project/reactdelete')
		.then(response => {
			console.log({response})
			if (response.data.status === 1) {
				uiStore.setBottomBarDetails('');			
				mainStore.deleteProject(projectStore.projectDetails.project_id);
				router.push('/app/');
				uiStore.setIsLoadingData(false);
			}
			else {
				return new Promise.reject("Error deleting project");
			}
		})
		.catch((err) => {
			console.error(err)
			// TODO: Add error message | JH
			// alert('Error deleting project... Sorry');
			Raven.captureException(err)
			Raven.showReportDialog();
			uiStore.setIsLoadingData(false);
		})
	}

	render() {
		const {projectStore} = this.props;
		return (
			<div className="overviewEditor__container">
				<div className="overviewEditor__options">
					<ProjectIconSelector />
					{projectStore.projectDetails.role === 0 && (
						<div className="overviewEditor__delete">
							<p>Delete this project</p>
							<DeleteObject 
								confirmationMessage={"This will permenantly delete your project, are you sure?"} 
								onDelete={this.handleClickDelete}/>
						</div>
					)}
				</div>
				<div className="overviewEditor__title">
					<IconPositioned 
					iconSize='40' 
					iconicType='link-intact-sm'  />
					Project Activity
				</div>

				<div className="overviewEditor__content overviewEditor__activityContainer">
					<ProjectReleaseOverview />
					<ProjectActivity />
				</div>
				<div className="overviewEditor__title">
					<IconPositioned 
					iconSize='40' 
					iconicType='people-sm'  />
					Team
				</div>
				<div className="overviewEditor__content">
					<ProjectDetails />
				</div>

				{/*
				<div className="overviewEditor__title">
					<IconPositioned 
					iconSize='40' 
					iconicType='pen-sm'  />
					Todo: Missing Detail
				</div>
				<div className="overviewEditor__content">
					<div className="overviewEditor__item">
						<IconPositioned iconSize="32" iconicType={'fire-sm'}  iconHoverColor='mango' />
						<div className={"overviewEditor__itemName"}>
							This component is missing detail
						</div>
					</div>
						
				</div>

				<div className="overviewEditor__title">
					<IconPositioned 
					iconSize='40' 
					iconicType='link-broken-sm'  />
					Todo: Missing Links
				</div>
				<div className="overviewEditor__content">
					<div className="overviewEditor__item">
						<IconPositioned iconSize="32" iconicType={'fire-sm'}  iconHoverColor='mango' />
						<div className={"overviewEditor__itemName"}>
							This component is missing a link
						</div>
					</div>
				</div>
				*/}

			</div>
		);
	}
}

export default OverviewEditor;
