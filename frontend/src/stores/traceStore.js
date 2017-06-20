import {observable, action} from 'mobx';
import uuid from 'uuid';

import getItemFromArray from '../utils/getItemFromArray';
import removeItemFromArray from '../utils/removeItemFromArray';

import Trace from '../models/traceModel';

import {AppToaster} from '../components/Toaster/AppToaster';

class TraceStore {
	@observable traceData = [];

	@action
	clearStore() {
		this.traceData = [];
	}

	@action
	createTrace(objectTypeId, objectId, basicId) {
		const randId = uuid();

		const newTrace = new Trace(randId, objectTypeId, objectId, basicId);

		const args = [
			{
				field: 'type',
				value: objectTypeId
			},
			{
				field: 'parent_id',
				value: basicId
			},
			{
				field: 'related1_id',
				value: objectId
			},
			{
				field: 'name',
				value: 'Trace'
			}
		]

		this.traceData.push(newTrace);

		return newTrace.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Trace' });
			removeItemFromArray(this.traceData, randId);
		})
	}

	@action
	loadTrace(data) {

		const newTrace = new Trace();

		this.traceData.push(newTrace);

		newTrace.load(data);

		// console.log('new loaded trace is', newTrace);
	}

	@action
	deleteTrace(traceId) {
		
		const trace = getItemFromArray(this.traceData, traceId);

		removeItemFromArray(this.traceData, traceId)

		trace.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Trace' });
			this.traceData.push(trace);
		})
	}


}

const traceStore = new TraceStore();

export default traceStore;
