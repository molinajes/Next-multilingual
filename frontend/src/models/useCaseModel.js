import {observable, action} from 'mobx';
import axios from 'axios';
import qs from 'qs';

import BaseModel from './baseModel';

import updateModel from '../utils/updateModel';

export default class UseCase extends BaseModel {
	@observable expanded;

	constructor(id, name, packageId, number) {
		super(id, name)
		this.object = '10';
		this.parent_id = packageId;
		this.number = number;
		this.expanded = true;
	}

	@action
	createUseCase = (args) => {
		this.loading = true;
		const dataObject = {};

		args.forEach(arg => {
			dataObject[`Component[${arg.field}]`] = encodeURIComponent(arg.value);
		});
		dataObject['Component[object]'] = this.object;

		const dataToSend = qs.stringify(dataObject, {encode: false});

		return axios.post('/app/component/reactadd', dataToSend)
		.then(response => {
			if (LOGGING_ENABLED) {
				console.log("Data", response)
				window.response = response;
			}
			// const parsedData = JSON.parse(response);
			

			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return Promise.reject('Overall Status Error!!!')
			}

			response.data.content.forEach((content, index)=> {
				if (content.message !== 'success') {
					return Promise.reject(`Non Sucess on ${index}: ${content.message}`)
				}
			})
			
			// const receivedData = JSON.parse(JSON.parse(data).content);
			const receivedData = response.data.content[0].content;
			// const receivedData = Object.values(JSON.parse(response.data.content))[0];
			// const receivedData = Object.values(JSON.parse(JSON.parse(response.data.content)[0]))[0]
			// console.log('recievedData', receivedData)
			updateModel(this, receivedData);
			this.loading = false;
			return response.data.content;
		})
	}

	@action setExpanded = (value) => {
		this.expanded = value;
	}
}
