import {observable, action} from 'mobx';

import Iface from '../models/ifaceModel';

import getItemFromArray from '../utils/getItemFromArray';
import removeItemFromArray from '../utils/removeItemFromArray';

import {AppToaster} from '../components/Toaster/AppToaster';

import ifaceTypeStore from './ifaceTypeStore';

class IfaceStore {
	@observable ifaceData = [];

	@action
	clearStore() {
		this.ifaceData = [];
	}

	@action createIface(id, name) {
		const newIface = new Iface(id, name);

		const args = [
			{
				field: 'name',
				value: name
			},
			{
				field: 'parent_id',
				value: ifaceTypeStore.ifaceTypeData[0].persistent_id // default value?? 
			}
		];

		this.ifaceData.push(newIface);

		return newIface.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Interface' });
			removeItemFromArray(this.ifaceData, id, 'persistent_id');
		})
	}

	@action
	createAndLinkIface(id, parentId, name, componentTypeId, joinType) {
		const newIface = new Iface(id, name);

		this.ifaceData.push(newIface);

		return newIface.createAndLink(parentId, name, componentTypeId, joinType);
	}

	@action editIface(id, field, value) {
		const data = this.ifaceData.find(obj => obj.persistent_id === id);
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
			AppToaster.show({ message: 'Error In Updating Interface' });
			data[field] = previousValue;
		})
	}

	@action
	deleteIface(ifaceId) {
		
		const iface = getItemFromArray(this.ifaceData, ifaceId);

		removeItemFromArray(this.ifaceData, ifaceId)

		iface.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Interface' });
			this.ifaceData.push(iface);
		})

	}

}

const ifaceStore = new IfaceStore();

export default ifaceStore;
