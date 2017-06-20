import {observable, action} from 'mobx';
import uuid from 'uuid';


import removeItemFromArray from '../utils/removeItemFromArray';
import getItemFromArray from '../utils/getItemFromArray';

import StepObject from '../models/stepObjectModel';

import {AppToaster} from '../components/Toaster/AppToaster';

class StepObjectStore {
	@observable stepObjectData = [];
	
	@action
	clearStore() {
		this.stepObjectData = [];
	}

	@action
	createStepObject(stepId, objectId, objectTypeId) {
		const randId = uuid();

		const newStepObject = new StepObject(randId, stepId, objectId, objectTypeId);

		const args = [
			{
				field: 'type',
				value: objectTypeId
			},
			{
				field: 'parent_id',
				value: stepId
			},
			{
				field: 'related1_id',
				value: objectId
			},
			{
				field: 'name',
				value: 'stepObject'
			}
		]

		this.stepObjectData.push(newStepObject);

		return newStepObject.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Step Object' });
			removeItemFromArray(this.stepObjectData, randId);
		})
	}

	@action
	loadStepObject(data) {

		const newStepObject = new StepObject();

		this.stepObjectData.push(newStepObject);

		newStepObject.load(data);
	}

	@action
	deleteStepObject(stepObjectId) {
		
		const stepObject = getItemFromArray(this.stepObjectData, stepObjectId);

		removeItemFromArray(this.stepObjectData, stepObjectId)

		stepObject.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Link' });
			this.stepObjectData.push(stepObject);
		})
	}

	/*@action
	updatestepObject(stepObjectId, value, field) {
		this.stepObjectData.findIndex(stepObject => stepObject.stepObject_id === stepObjectId)[field] = value;
	}*/

}

const stepObjectStore = new StepObjectStore();

export default stepObjectStore;
