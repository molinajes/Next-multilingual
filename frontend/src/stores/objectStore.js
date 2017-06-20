import {observable, action} from 'mobx';

import ObjectModel from '../models/objectModel';

import getItemFromArray from '../utils/getItemFromArray';
import removeItemFromArray from '../utils/removeItemFromArray';

import {AppToaster} from '../components/Toaster/AppToaster';

class ObjectStore {
	@observable objectData = [];

	@action
	clearStore() {
		this.objectData = [];
	}

	@action createObject(id, name) {
		const newObject = new ObjectModel(id, name);

		const args = [
			{
				field: 'name',
				value: name
			}
		];

		this.objectData.push(newObject);


		return newObject.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Object' });
			removeItemFromArray(this.objectData, id);
		})
	}

	@action
	createAndLinkObject(id, parentId, name, componentTypeId, joinType) {
		const newObject = new ObjectModel(id, name);

		this.objectData.push(newObject);

		return newObject.createAndLink(parentId, name, componentTypeId, joinType);
	}

	@action editObject(id, field, value) {
		const data = this.objectData.find(obj => obj.persistent_id === id);
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
			AppToaster.show({ message: 'Error In Updating Object' });
			data[field] = previousValue;
		})
	}

	@action
	deleteObject(objectId) {
		
		const currentObject = getItemFromArray(this.objectData, objectId);

		removeItemFromArray(this.objectData, objectId)

		currentObject.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Object' });
			this.objectData.push(currentObject);
		})

	}

}

const objectStore = new ObjectStore();

export default objectStore;
