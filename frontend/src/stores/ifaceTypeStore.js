import {observable, action} from 'mobx';
import uuid from 'uuid';

import removeItemFromArray from '../utils/removeItemFromArray';

import IfaceType from '../models/ifaceTypeModel';

import {AppToaster} from '../components/Toaster/AppToaster';

class IfaceTypeStore {
	@observable ifaceTypeData = [];

	@action
	clearStore() {
		this.ifaceTypeData = [];
	}

	@action
	createIfaceType(name) {
		const randId = uuid();

		// console.log("Create ifaceType",objectTypeId,objectId,basicId)

		const newIfaceType = new IfaceType(randId, name);

		const args = [
			{
				field: 'name',
				value: name
			}
		]

		this.ifaceTypeData.push(newIfaceType)

		return newIfaceType.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Interface Type' });
			removeItemFromArray(this.ifaceTypeData, randId);
		})


	}

	@action
	deleteIfaceType(ifaceType) {

		removeItemFromArray(this.ifaceTypeData, ifaceType.persistnet_id);

		ifaceType.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Interface Type' });
			this.ifaceTypeData.push(ifaceType);
		})
	}

	@action editIfaceType(id, field, value) {
		const data = this.ifaceTypeData.find(obj => obj.persistent_id === id);
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
			AppToaster.show({ message: 'Error In Updating Interface Type' });
			data[field] = previousValue;
		})
	}


}

const ifaceTypeStore = new IfaceTypeStore();

export default ifaceTypeStore;
