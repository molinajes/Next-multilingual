import BaseModel from './baseModel';

import axios from 'axios';

export default class Actor extends BaseModel {
	constructor(id, name) {
		super(id, name)
		this.object = '4';
	}

	merge = (oldId, newId) => {
		if (!ENV_PRODUCTION) return Promise.resolve();
		const dataToSend = `actor[old_id]=${oldId}&actor[new_id]=${newId}`;

		return axios.post('/app/component/reactActorMerge', dataToSend)
		.then(response => {
			if (LOGGING_ENABLED) {
				console.log("Data", response)
				window.response = response;
			}

			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return Promise.reject('Overall Status Error')
			}

			if ( response.data.message !== 'success') {
				// console.error("Overall Status Error")
				return Promise.reject('Overall Status Error')
			}

			return response;
		})
	}
}
