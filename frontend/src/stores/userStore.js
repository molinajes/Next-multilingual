import {observable, action} from 'mobx';
import axios from 'axios';


import removeItemFromArray from '../utils/removeItemFromArray';

import {AppToaster} from '../components/Toaster/AppToaster';

class UserStore {
	@observable followsList = [];
	@observable projectsList = [];
	@observable invitesList = [];

	@observable userDetails = {
		"id":"",
		"firstname":"",
		"lastname":"",
		"email":"",
		"password":"",
		"address_id":null,
		"salt":"",
		"username":"",
		"type":"",
		"active":"",
		"company_id":"",
		"admin":"",
		"verify":"",
		"verification_code":"",
		"developer":"",
		"mailchimp":"",
		"valid_until":"",
		"FBid":""
	};

	@action
	clearStore() {
		this.followsList = [];
		this.projectsList = [];
		this.invitesList = [];
	}

	@action
	acceptInvite(id) {
		
		const dataToSend = `follower[foloower_id]=${id}`;

		axios.post('/app/follower/reactaccept', dataToSend)
		.then(response => {
			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return Promise.reject('Overall Status Error')
			}			
		})
		.catch(() => {
			AppToaster.show({ message: 'Error in accepting invite' });
		})
	}

	@action
	setUserDetails(data) {
		this.userDetails = data;
	}

	@action
	updateUserDetails(field, value) {
		const previousValue = this.userDetails[field];
		this.userDetails[field] = value;

		const dataToSend = `user[${field}]=${encodeURIComponent(value)}&user[id]=${this.userDetails.user_id}`;

		axios.post('/app/user/reactupdate', dataToSend)
		.then(response => {
			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return Promise.reject('Overall Status Error')
			}			
		})
		.catch(() => {
			AppToaster.show({ message: 'Error In Updating Actor' });
			this.userDetails[field] = previousValue;
		})
	}

	@action
	deleteProject(id) {
		removeItemFromArray(this.projectsList, id, 'id');
	}

}

const userStore = new UserStore();

export default userStore;
