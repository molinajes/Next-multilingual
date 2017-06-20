import {extendObservable} from 'mobx';
import axios from 'axios';
import BaseModel from './baseModel';

export default class Rule extends BaseModel {
	constructor(id, name) {
		super(id, name)
		this.object = '1';
	}

	createAndLink = (parentId, name, componentTypeId, joinType) => {
		if (!ENV_PRODUCTION) return Promise.resolve();
		const dataToSend = `persistent_id=${parentId}&name=${name}&object=${componentTypeId}&type=${joinType}`

		return axios.post('/app/component/reactlinknew', dataToSend)
		.then(response => {
			if (LOGGING_ENABLED) {
				window.response = response;
			}

			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return new Promise.reject('Overall Status Error')
			}

			response.data.content.forEach((content, index)=> {
				if (content.message !== 'success') {
					console.log('Non success ' + index)
					return new Promise.reject(`Non Sucess on ${index}: ${content.message}`)
				}
			})
			
			// const receivedData = JSON.parse(JSON.parse(data).content);
			const receivedComponentData = response.data.content[0].content;
			const receivedOtherData = response.data.content[1].content;

			extendObservable(this, receivedComponentData);
			return [this, receivedOtherData];
		})
	}
}
