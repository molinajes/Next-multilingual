import {extendObservable} from 'mobx';
import axios from 'axios';

import BaseModel from './baseModel';

export default class Form extends BaseModel {
	constructor(id, name) {
		super(id, name);
		this.object = '2';
	}

	createAndLink = (parentId, name, componentTypeId, joinType) => {
		if (!ENV_PRODUCTION) return Promise.resolve();
		const dataToSend = `persistent_id=${parentId}&name=${name}&object=${componentTypeId}&type=${joinType}`

		return axios.post('/app/component/reactlinknew', dataToSend)
		.then(response => {
			
			if ( response.data.status !== 1) {
				console.error(response.data.message)
				return;
			}

			if ( response.data.message !== 'success') {
				console.warn('Non success message:',response.data.message);
			}
			
			// const receivedData = JSON.parse(JSON.parse(data).content);
			const receivedComponentData = response.data.content[0].content;
			const receivedOtherData = response.data.content[1].content;

			extendObservable(this, receivedComponentData);
			return [this, receivedOtherData];
		})
	}
}
