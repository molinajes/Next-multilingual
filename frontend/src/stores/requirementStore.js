import {observable, action, toJS, extendObservable} from 'mobx';
import uuid from 'uuid';
import axios from 'axios';

// import updateBasicNumber from '../utils/updateBasicNumber';
// import componentNameToId from '../utils/componentNameToId';

// import importedStaticRealData from '../assets/staticRealData.json';
//http://www.striphtml.com/

// import mainStore from './mainStore';
import packageStore from './packageStore';
import useCaseStore from './useCaseStore';
import componentStore from './componentStore';
import actorStore from './actorStore';

// import Module from '../models/moduleModel';
import Requirement from '../models/requirementModel';
// import Detail from '../models/detailModel';

import library1 from '../assets/library1.json';

import removeItemFromArray from '../utils/removeItemFromArray';
import getItemFromArray from '../utils/getItemFromArray';
import removeTracesAndLinks from '../utils/removeTracesAndLinks';
import updateModel from '../utils/updateModel';

import {AppToaster} from '../components/Toaster/AppToaster';

const libraries = {
	library1
}

// import uiStore from './uiStore';

class RequirementStore {
	// @observable requirementData = [];
	@observable groupData = [];
	@observable requirementData = [];
	@observable detailData = [];

	constructor() {
		window.toJS = toJS;
	}

	@action
	clearStore() {
		this.groupData = [];
		this.requirementData = [];
		this.detailData = [];
	}

	getModuleById(id) {
		return this.groupData.find(obj => obj.persistent_id === id);
	}

	getRequirementByPersistentId(persistentId) {
		return this.requirementData.find(obj => obj.persistent_id === persistentId);
	}

	@action createRequirement(name, moduleId, number) {
		
		const randId = uuid();
		
		const parentModule = this.getModuleById(moduleId);

		const newRequirement = new Requirement(randId, name, moduleId, number);

		const args = [
			{
				field: 'name',
				value: name
			},
			{
				field: 'parent_id',
				value: moduleId
			},
			{
				field: 'number',
				value: number
			}
		]

		parentModule.children.push(newRequirement);

		this.requirementData.push(newRequirement);

		newRequirement.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Requirement' });
			removeItemFromArray(parentModule.children, randId, 'persistent_id');
			removeItemFromArray(this.requirementData, randId, 'persistent_id');
		})

	}

	@action
	deleteRequirement(data) {


		const parentModule = this.getModuleById(data.parent_id);

		parentModule.removeChild(data.persistent_id);
		removeItemFromArray(this.requirementData, data.persistent_id);

		data.delete()
		.then(response => {
			removeTracesAndLinks(response.data.content);
		})
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Requirement' });
			parentModule.children.push(data);
			this.requirementData.push(data);
		})
	}

	@action
	deleteDetail(data) {

		// const detail = getItemFromArray(this.requirementData, data.persistent_id, 'persistent_id');

		const parentModule = this.getRequirementByPersistentId(data.parent_id);

		parentModule.removeChild(data.persistent_id);
		removeItemFromArray(this.detailData, data.persistent_id);

		data.delete()
		.then(response => {
			removeTracesAndLinks(response.data.content);
		})
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Detail' });
			parentModule.children.push(data);
			this.requirementData.push(data);
		})
	}

	@action
	updateBasic(basicId, type, value, field) {
		let basicToUpdate;
		let previousValue;
		if (type === 'group') {
			basicToUpdate = this.groupData.find(req => req.persistent_id === basicId);
			previousValue = basicToUpdate[field];
			basicToUpdate[field] = value;
		}
		else if (type === 'requirement') {
			basicToUpdate = this.requirementData.find(req => req.persistent_id === basicId);
			previousValue = basicToUpdate[field];
			basicToUpdate[field] = value;
		}
		else if (type === 'detail') {
			basicToUpdate = this.detailData.find(req => req.persistent_id === basicId);
			previousValue = basicToUpdate[field];
			basicToUpdate[field] = value;
		}
		else {
			return;
		}

		const args = [
			{
				field: field,
				value: value
			}
		]		

		return basicToUpdate.update(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Updating Requirement' });
			// Raven.captureException(new Error('Error Updating Requirement'))
			basicToUpdate[field] = previousValue;
			
		})

	}

	@action
	deleteModule(persistentId) {
		const removedModule = removeItemFromArray(this.groupData, persistentId);

		removedModule.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Module'});
			this.groupData.push(removedModule);
		})
	}

	@action
	createGroup(name) {

		const randId = uuid();

		const newModule = new Requirement(randId, name);
	
		const args = [
			{
				field: 'name',
				value: name
			},
			{
				field: 'parent_id',
				value: '-1'
			}
		]

		this.groupData.push(newModule);
		
		// Set the expanded state of the group in the ui
		// uiStore.updateGroupsExpanded(newModule.persistent_id)
		return newModule.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Module' });
			removeItemFromArray(this.groupData, randId);
		})
		
	}

	@action
	updateBasicNameOrPriority(name,priority,basicId) {
		const PRIORITY_LEVELS = 4
		const newPriority = priority % PRIORITY_LEVELS;
		// For simplicity on the backend we combine these two functions into one
		if (LOGGING_ENABLED) {
			console.log("Updated Requirement", basicId, "to its name:", name, "and priority",newPriority);
		}

		const type = this.requirementData.components.basic.find(obj => obj.persistent_id === basicId).type;

		let basicData;
		if (type === 'group') {
			basicData = this.groupData.find((obj) => obj.persistent_id === basicId);
			basicData.priority = newPriority;
			basicData.name = name;
		}
		if(type === 'requirement') {
			basicData = this.requirementData.find((obj) => obj.persistent_id === basicId);
			basicData.priority = newPriority;
			basicData.name = name;
		}
		if(type === 'detail') {
			basicData = this.detailData.find((obj) => obj.persistent_id === basicId);
			basicData.priority = newPriority;
			basicData.name = name;
		}

		// AJAX
		if (ENV_PRODUCTION) {
			$.ajax('/req/basic/reactupdate',{
				type: "POST",	
				data: "Basic[basic_id]=" + basicId + "&Basic[name]=" + name + "&Basic[priority]=" + priority,
				// contentType: "application/json; charset=utf-8",
				dataType: "html",
				success: (data) => {
					if (LOGGING_ENABLED) {
						console.log('update', data)
					}
					const receivedData = JSON.parse(JSON.parse(data).content);
					extendObservable(basicData,...receivedData);					
				},
				error: (error) => {
					console.error(error)
				},
			})
		}
		// END AJAX
		
		// TESTING
	}

	@action
	updateApproval(basicId, approvalLevel, comments) {
		const APPROVAL_LEVELS = 3;
		approvalLevel = approvalLevel % APPROVAL_LEVELS;
		console.log(`Approved ${basicId} to level ${approvalLevel} with comments ${comments}`)
		// AJAX
		if (ENV_PRODUCTION) {
			$.ajax('/req/basic/reactapprove',{
				type: "POST",	
				data: "Basicapproval[basic_id]=" + basicId + "&Basicapproval[comments]=" + comments,
				// contentType: "application/json; charset=utf-8",
				dataType: "html",
				success: (data) => {
					console.log(data)
					// const receivedData = JSON.parse(JSON.parse(data).content);					
				},
				error: (error) => {
					console.error(error)
				},
			})
		}
		// END AJAX
		// else {
		// 	this.basicRequirementData.find(obj => obj.persistent_id === basicId).basicapproval_id = approvalLevel;
		// }
		// TESTING		
	}

	@action 
	reorderRequirements(updatedBasics) {
		if (LOGGING_ENABLED) {
			console.log('updatedbasics',updatedBasics)
		}
		// const toSend = JSON.stringify(Object.assign({},updatedBasics))
		// console.log(window.toJS(toSend))

		const toSend = updatedBasics.map((basic, index)=> {
			return `Component[${index}][persistent_id]=${basic.persistent_id}&` +
			`Component[${index}][number]=${basic.newNumber}&` + 
			`Component[${index}][parent_id]=${basic.newParentId}&` + 
			`Component[${index}][object]=21`
		}).join('&');
		if (LOGGING_ENABLED) {
			console.log('tosend',toSend);
		}

		updatedBasics.forEach(basic => {
			let basicToUpdate;
			basicToUpdate = getItemFromArray(this.groupData, basic.persistent_id);
			if (!basicToUpdate) {
				basicToUpdate = getItemFromArray(this.requirementData, basic.persistent_id);
			}
			if (!basicToUpdate) {
				basicToUpdate = getItemFromArray(this.detailData, basic.persistent_id);
			}
			basicToUpdate.number = basic.newNumber;
			basicToUpdate.parent_id = basic.newParentId;
		})


		if (ENV_PRODUCTION && toSend) {
			
			return axios.post('/app/component/reactupdate', toSend)
			.then(response => {
				if (LOGGING_ENABLED) {
					console.log("Data", response)
					window.response = response;
				}
				// const parsedData = JSON.parse(response);
				const status = response.data.status

				if ( status !== 1) {
					console.error(response.data.message)
					return;
				}
				
				
				
				
				return response.data.content;
			}).then(content => {
				if (LOGGING_ENABLED) {
					console.log('content',content)
				}
				content.forEach(basic => {
					let basicToUpdate;
					basicToUpdate = getItemFromArray(this.groupData, basic.content.persistent_id);
					if (!basicToUpdate) {
						basicToUpdate = getItemFromArray(this.requirementData, basic.content.persistent_id);
					}
					if (!basicToUpdate) {
						basicToUpdate = getItemFromArray(this.detailData, basic.content.persistent_id);
					}
					updateModel(basicToUpdate, basic.content);
				})
			})


		}

		

	}	


	@action
	addLibrary(id) {
		const libraryData = libraries[`library${id}`];

		if (libraryData.hasOwnProperty('actor')) {
			actorStore.actorData.push(...libraryData.actor)
		}
		if (libraryData.hasOwnProperty('usecase')) {
			useCaseStore.useCaseData.push(...libraryData.usecase)
		}
		if (libraryData.hasOwnProperty('package')) {
			packageStore.packageData.push(...libraryData.package)
		}
		if (libraryData.hasOwnProperty('rule')) {
			componentStore.componentData.rule.push(...libraryData.rule)
		}
		if (libraryData.hasOwnProperty('iface')) {
			componentStore.componentData.iface.push(...libraryData.iface)
		}
		if (libraryData.hasOwnProperty('form')) {
			componentStore.componentData.form.push(...libraryData.form)
		}
		if (libraryData.hasOwnProperty('object')) {
			componentStore.componentData.object.push(...libraryData.object)
		}

	}
}

const requirementStore = new RequirementStore();

export default requirementStore;
