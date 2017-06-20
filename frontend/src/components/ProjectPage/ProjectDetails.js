import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import {observer, inject} from 'mobx-react';

import Collaborators from './Collaborators';
import CreateCollaborator from './CreateCollaborator';


@inject('projectStore')
@observer
class ProjectDetails extends Component {

	static propTypes = {
		projectStore: PropTypes.object.isRequired
	}

	componentDidMount = () => {
		const {projectStore} = this.props;
		axios.get('/app/follower/reactgetcollaborators')
		.then(response => {
			projectStore.setCollaborators(response.data.content);
		})
	}


	render() {
		const {projectStore} = this.props;
		/*const collaboratorData = [
			{name: "RZA"},
			{name: "ghostface"},
			{name: "ODB"}
		];*/
		const confirmedCollaborators = projectStore.collaborators.confirmed.map((collaborator) => {
			return <Collaborators collaboratorData={collaborator} key={collaborator.follower_id}/>
		})
		const pendingCollaborators = projectStore.collaborators.pending.map((collaborator) => {
			return <Collaborators collaboratorData={collaborator} key={collaborator.follower_id}/>
		})
		// const CompletenessScore = Math.round(Math.random() * 100);
		return (
			<div className="projectDetails">

				<div className="overviewEditor__table">
					<div className="overviewEditor__tableHead collaborators__tableHead">
						<div className="overviewEditor__cell"></div>
						<div className="overviewEditor__cell">Name</div>
						<div className="overviewEditor__cell">Status</div>
						{/*<div className="overviewEditor__cell">Company</div>*/}
						<div className="overviewEditor__cell">Email</div>
						{projectStore.projectDetails.role === 0 && (
							<div className="overviewEditor__cell">Remove Collaborator</div>
						)}
					</div>
						{confirmedCollaborators.length + pendingCollaborators.length === 0 ? "No team members" : ""}
						{confirmedCollaborators}
						{pendingCollaborators}
						
				</div>
				<div className="overviewEditor__title">Invite new team members below</div>
				<CreateCollaborator />
			</div>
			);
	}

}




export default ProjectDetails;