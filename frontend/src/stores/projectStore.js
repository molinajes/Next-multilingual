import {observable, action} from 'mobx';
import axios from 'axios';
import ss from '../utils/stripslashes';

import {AppToaster} from '../components/Toaster/AppToaster';

import mainStore from './mainStore';
import uiStore from './uiStore';

class ProjectStore {
	@observable projectSet = false;

	@observable collaborators = {
		confirmed: [],
		pending: []
	};

	@observable releases = [];

	@observable projectDetails = {};

	@observable activityData = [];


	@action
	clearStore() {
		this.projectSet = false;
		this.collaborators = {
			confirmed: [],
			pending: []
		};
		this.releases = [];
		this.projectDetails = {};
		this.activityData = []
	}

	@action setProjectIsSet(value) {
		this.projectSet = value;
	}

	@action setReleases(releases) {
		this.releases = releases;
	}

	@action setProjectDetails(projectDetails) {
		this.projectDetails = projectDetails;

		Object.keys(projectDetails).forEach(field => {
			if (projectDetails[field]) {
				this.projectDetails[field] = ss(projectDetails[field]);				
			}
		})
	}

	@action setCollaborators(collabs) {
		this.collaborators.confirmed = collabs.confirmed;
		this.collaborators.pending = collabs.pending;
	}

	@action setActivityData(data) {
		this.activityData = data;
	}

	@action editProjectDetails(field, value) {

		const previousValue = this.projectDetails[field];

		this.projectDetails[field] = value;

		const dataToSend = `project[${field}]=${value}&project[project_id]=${this.projectDetails.project_id}`;

		axios.post('/app/project/reactupdate', dataToSend)
		.then(response => {
			console.log("Data", response)
			window.response = response;

			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return new Promise.reject('Overall Status Error')
			}

		})
		.catch(() => {
			AppToaster.show({ message: 'Error In Updating Project Details' });
			this.projectDetails[field] = previousValue;
		})
	}

	@action deleteCollaborator(id) {
		const dataToSend = `follower[follower_id]=${id}`;
		axios.post('/app/follower/reactdelete', dataToSend)
		.then(response => {
			console.log("Data", response)
			window.response = response;

			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return new Promise.reject('Overall Status Error')
			}

			this.setCollaborators(response.data.content);

			/*response.data.content.forEach((content, index)=> {
				if (content.message !== 'success') {
					return new Promise.reject(`Non Sucess on ${index}: ${content.message}`)
				}
			})*/
		})
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Colaborator' });
		})
	}

	@action addCollaborator(first, last, email) {
		const dataToSend = `follower[email]=${email}&follower[firstname]=${first}&follower[lastname]=${last}`;
		axios.post('/app/follower/reactinvitecollaborator', dataToSend)
		.then(response => {
			console.log("Data", response)
			window.response = response;

			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return new Promise.reject('Overall Status Error')
			}

			this.setCollaborators(response.data.content);

		})
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Colaborator' });
		})
	}

	@action createProject() {
		let postData = `project[name]=New Project`;
		
		uiStore.setIsLoadingData(true);
		axios.post('/app/project/reactcreate', postData)
		.then(response => {
			if (LOGGING_ENABLED) console.log(response);

			// if (response.data.status !== 1) {
				
			// }
			
			mainStore.clearStores();
			mainStore.organiseData(response.data.content);
			this.setProjectIsSet(true);
			uiStore.setIsLoadingData(false);

			uiStore.router.push('/app/gather');
		})
		.catch(() => {
			// TODO: Handle error of create empty failure | JH
			uiStore.setIsLoadingData(false);
			uiStore.router.push('/app/')
		})
	}

}

const projectStore = new ProjectStore();

export default projectStore;
