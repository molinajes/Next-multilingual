import {observable, action} from 'mobx';
import uuid from 'uuid';
import axios from 'axios';

import removeItemFromArray from '../utils/removeItemFromArray';
import getItemFromArray from '../utils/getItemFromArray';
import removeTracesAndLinks from '../utils/removeTracesAndLinks';
import updateModel from '../utils/updateModel';

import flowStore from './flowStore';

import Step from '../models/stepModel';

import {AppToaster} from '../components/Toaster/AppToaster';

class StepStore {
	@observable stepData = [];

	@action
	clearStore() {
		this.stepData = [];
	}

	@action
	createStep(actorId, flowId, text, result, number) {
		const randId = uuid();

		const newStep = new Step(randId, actorId, flowId, text, result, number);

		let parentArray = getItemFromArray(flowStore.flowData, flowId);
		// Error checking for finding parent.
		if (parentArray === -1) {
			return Promise.reject('Failed to get parent array when creating a Step.')
		}
		// Get the use cases in the parent package
		parentArray = parentArray.children;

		parentArray.push(newStep);

		const args = [
			{
				field: 'text',
				value: text
			},
			{
				field: 'parent_id',
				value: flowId
			},
			{
				field: 'text2',
				value: result
			},
			{
				field: 'related1_id',
				value: actorId
			},
			{
				field: 'number',
				value: number
			}
		]

		this.stepData.push(newStep);

		return newStep.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Step' });
			removeItemFromArray(parentArray, randId);
			removeItemFromArray(this.stepData, randId);
		})

		
	}

	@action
	loadStep(data) {
		let parentArray = getItemFromArray(flowStore.flowData, data.parent_id);
		// Error checking for finding parent.
		if (parentArray === -1) {
			return Promise.reject('Failed to get parent array when creating a Step.')
		}
		// Get the use cases in the parent package
		parentArray = parentArray.children;

		const newStep = new Step();

		this.stepData.push(newStep);

		parentArray.push(newStep);

		newStep.load(data);
	}

	@action
	deleteStep(step) {

		let parentArray = getItemFromArray(flowStore.flowData, step.parent_id);
		// Error checking for finding parent.
		if (parentArray === -1) {
			AppToaster.show({ message: 'Error In Deleting Flow' });
			return;
		}
		// Get the use cases in the parent UC
		parentArray = parentArray.children;

		removeItemFromArray(this.stepData, step.persistent_id);
		removeItemFromArray(parentArray, step.persistent_id);

		step.delete()
		.then(response => {
			removeTracesAndLinks(response.data.content);
		})
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Step' });
			this.stepData.push(step);
			parentArray.push(step);
		})
	}

	@action
	updateStep(stepId, value, field) {
		const data = this.stepData.find(step => step.persistent_id === stepId);
		const previousValue = data[field];
		data[field] = value;

		const args = [
			{
				field: field,
				value: value
			}
		]		

		data.update(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Updating Step' });
			data[field] = previousValue;
		})
	}

	@action
	reorderSteps(updatedSteps) {
		console.log('updatedUCs',updatedSteps)


		const toSend = updatedSteps.map((step, index)=> {
			return `Component[${index}][persistent_id]=${step.persistent_id}&` +
			`Component[${index}][number]=${step.newNumber}&` + 
			`Component[${index}][parent_id]=${step.newParentId}&` + 
			`Component[${index}][object]=9`
		}).join('&');
		console.log('tosend',toSend);

		updatedSteps.forEach(step => {
			let stepToUpdate;
			stepToUpdate = getItemFromArray(this.stepData, step.persistent_id);
			stepToUpdate.number = step.newNumber;
			stepToUpdate.parent_id = step.newParentId;
		})


		if (toSend && ENV_PRODUCTION) {
			
			return axios.post('/app/component/reactupdate', toSend)
			.then(response => {
				console.log("Data", response)
				window.response = response;
				// const parsedData = JSON.parse(response);
				const status = response.data.status

				if ( status !== 1) {
					console.error(response.data.message)
					return;
				}

				return response.data.content;
			}).then(content => {
				console.log('content',content)
				content.forEach(step => {
					let stepToUpdate;
					stepToUpdate = getItemFromArray(this.stepData, step.content.persistent_id);
					updateModel(stepToUpdate, step.content);
				})
			})
		}	

	}

}

const stepStore = new StepStore();

export default stepStore;



