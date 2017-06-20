import {observable, action} from 'mobx';
import uuid from 'uuid';

import Flow from '../models/flowModel'

import useCaseStore from './useCaseStore';

import {AppToaster} from '../components/Toaster/AppToaster';

import getItemFromArray from '../utils/getItemFromArray';
import removeItemFromArray from '../utils/removeItemFromArray';

class FlowStore {
	@observable flowData = [];

	@action
	clearStore() {
		this.flowData = [];
	}

	@action
	createFlow(name, useCaseId, startId, rejoinId) {
		const randId = uuid();

		let parentArray = getItemFromArray(useCaseStore.useCaseData, useCaseId);
		// Error checking for finding parent.
		if (parentArray === -1) {
			return Promise.reject('Failed to get parent array when creating a flow.')
		}
		// Get the use cases in the parent UC
		parentArray = parentArray.children;
		
		const newFlow = new Flow(randId, name, useCaseId, startId, rejoinId);

		parentArray.push(newFlow)

		this.flowData.push(newFlow);

		const args = [
			{
				field: 'type',
				value: 'main'
			},
			{
				field: 'parent_id',
				value: useCaseId
			},
			{
				field: 'related1_id',
				value: startId
			},
			{
				field: 'related2_id',
				value: rejoinId
			},
			{
				field: 'name',
				value: name
			}
		]

		newFlow.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Flow' });
			removeItemFromArray(parentArray, randId);
			removeItemFromArray(this.flowData, randId);
		})

		// stepStore.createStep('1',newFlow.persistent_id, 'Actor ...', 'System ...')
	}

	@action
	loadFlow(data) {

		let parentArray = getItemFromArray(useCaseStore.useCaseData, data.parent_id);
		// Error checking for finding parent.
		if (parentArray === -1) {
			return Promise.reject('Failed to get parent array when creating a flow.')
		}
		// Get the use cases in the parent UC
		parentArray = parentArray.children;
		
		const newFlow = new Flow();

		parentArray.push(newFlow)

		this.flowData.push(newFlow);

		newFlow.load(data);
	}

	@action
	deleteFlow(flow) {

		let parentArray = getItemFromArray(useCaseStore.useCaseData, flow.parent_id);
		// Error checking for finding parent.
		if (parentArray === -1) {
			AppToaster.show({ message: 'Error In Deleting Flow' });
			return;
		}
		// Get the use cases in the parent UC
		parentArray = parentArray.children;

		removeItemFromArray(this.flowData, flow.persistent_id);
		removeItemFromArray(parentArray, flow.persistent_id);

		flow.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Flow' });
			this.flowData.push(flow);
			parentArray.push(flow);
		})
	}

	@action
	editFlow(flowId, field, value) {
		const data = this.flowData.find(obj => obj.persistent_id === flowId);
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
			AppToaster.show({ message: 'Error In Updating Flow' });
			data[field] = previousValue;
		})
	}

}

const flowStore = new FlowStore();

export default flowStore;
