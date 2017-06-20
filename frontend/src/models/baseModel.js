import {observable} from 'mobx';
import axios from 'axios';
import qs from 'qs';

import removeItemFromArray from '../utils/removeItemFromArray';
import updateModel from '../utils/updateModel';


export default class Base {
	@observable id;
	@observable persistent_id;
	@observable number;
	@observable name;
	@observable text;
	@observable text2;
	@observable text3;
	@observable parent_id;
	@observable related1_id;
	@observable related2_id;
	@observable type;
	@observable sequence;
	@observable flag;
	@observable project_id;
	@observable release_id;
	@observable object;
	@observable children;

	@observable loading;

	constructor(id, name) {
		this.id = id;
		this.persistent_id = id;
		this.name = name;
		this.children = [];
	}

	load = (obj) => {
		// console.log(obj)
		updateModel(this, obj);
		return this;
	}

	create = (args) => {
		if (!ENV_PRODUCTION) return Promise.resolve();
		const dataObject = {};

		this.loading = true;

		args.forEach(arg => {
			dataObject[`Component[${arg.field}]`] = encodeURIComponent(arg.value);
		});
		dataObject['Component[object]'] = this.object;

		const dataToSend = qs.stringify(dataObject, {encode: false});
		/*if (LOGGING_ENABLED) {
			console.log('Query String:', dataToSend)
		}*/

		return axios.post('/app/component/reactadd', dataToSend)
		.then(response => {
			if (LOGGING_ENABLED) {
				console.log("Data", response)
				window.response = response;
			}

			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return Promise.reject('Overall Status Error')
			}

			response.data.content.forEach((content, index)=> {
				if (content.message !== 'success') {
					return Promise.reject(`Non Sucess on ${index}: ${content.message}`)
				}
			})
			
			const initialData = response.data.content[0].content;
			updateModel(this, initialData);
			this.loading = false;
			return response.data.content;
		})
	}

	update = (args) => {
		if (!ENV_PRODUCTION) return Promise.resolve();
		const dataObject = {};

		args.forEach(arg => {
			dataObject[`Component[${arg.field}]`] = encodeURIComponent(arg.value);
		});
		dataObject['Component[object]'] = this.object;
		dataObject['Component[persistent_id]'] = this.persistent_id;

		const dataToSend = qs.stringify(dataObject, {encode: false});
		if (LOGGING_ENABLED) {
			console.log('Query String:', dataToSend)
		}

		return axios.post('/app/component/reactupdate', dataToSend)
		.then(response => {
			if (LOGGING_ENABLED) {
				console.log("Data", response)
				window.response = response;
			}

			if ( response.data.status !== 1) {
				// console.error("Overall Status Error")
				return Promise.reject('Overall Status Error')
			}

			response.data.content.forEach((content, index)=> {
				if (content.message !== 'success') {
					return Promise.reject(`Non Sucess on ${index}: ${content.message}`)
				}
			})
			
			const initialData = response.data.content[0].content;
			// extendObservable(this, initialData);
			updateModel(this, initialData);
			return response.data.content;
		})
		
	}

	delete = () => {
		if (!ENV_PRODUCTION) return Promise.resolve();
		const dataToSend = `Component[object]=${this.object}&Component[persistent_id]=${this.persistent_id}`;

		return axios.post('/app/component/reactdelete', dataToSend)
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

			/*response.data.content.forEach((content, index)=> {
				if (content.message !== 'success') {
					return Promise.reject(`Non Sucess on ${index}: ${content.message}`)
				}
			})*/
			if (LOGGING_ENABLED) {
				console.table(response.data.content);
			}
			return response;
		})
	}

	removeChild = (childId, arrayName = 'children') => {
		// Need to use slice since array is an observable array and thus yields false
		if (this.hasOwnProperty(arrayName) && Array.isArray(this[arrayName].slice())) {
			removeItemFromArray(this[arrayName], childId, 'persistent_id');
		}
		if (!this.hasOwnProperty(arrayName)) {
			throw new Error('not hasOwn')
		}
		if (!Array.isArray(this[arrayName].slice())) {
			throw new Error('not array')
		}
		// else {
		// 	throw new Error('issue with array in parent')
		// }
	}
}