import {observable, action} from 'mobx';
import uuid from 'uuid';

import ObjectProperty from '../models/objectPropertyModel';

import getItemFromArray from '../utils/getItemFromArray';
import removeItemFromArray from '../utils/removeItemFromArray';

import componentStore from './componentStore';

import {AppToaster} from '../components/Toaster/AppToaster';

class ObjectPropertyStore {
	@observable objectPropertyData = [];

	@action
	clearStore() {
		this.objectPropertyData = [];
	}

	@action
	createObjectProperty(objectId, number) {
		const randId = uuid();

		const newObjectProperty = new ObjectProperty(randId, '', objectId, number);

		this.objectPropertyData.push(newObjectProperty);

		let parentArray = getItemFromArray(componentStore.componentData.object, objectId);
		// Error checking for finding parent.
		if (parentArray === -1) {
			return Promise.reject('Failed to get parent array when creating a Object Property.')
		}
		// Get the use cases in the parent form
		parentArray = parentArray.children

		parentArray.push(newObjectProperty);
		
		const args = [
			{
				field: 'parent_id',
				value: objectId
			},
			{
				field: 'number',
				value: number
			}
		]

		newObjectProperty.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Object Property' });
			removeItemFromArray(parentArray, randId);
			removeItemFromArray(this.objectPropertyData, randId);
		})
	}

	@action
	editObjectProperty(objectProperty, field, value) {
		const data = objectProperty;
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
			AppToaster.show({ message: 'Error In Updating Object Property' });
			data[field] = previousValue;
		})
	}

	@action
	deleteObjectProperty(objectProperty) {


		let parentArray = getItemFromArray(componentStore.componentData.object, objectProperty.parent_id);
		// Error checking for finding parent.
		if (parentArray === -1) {
			AppToaster.show({ message: 'Error In Deleting Flow' });
			return;
		}
		// Get the use cases in the parent UC
		parentArray = parentArray.children;

		removeItemFromArray(this.objectPropertyData, objectProperty.persistent_id);
		removeItemFromArray(parentArray, objectProperty.persistent_id);

		objectProperty.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting objectProperty' });
			this.objectPropertyData.push(objectProperty);
			parentArray.push(objectProperty);
		})
	}

}

const objectPropertyStore = new ObjectPropertyStore();

export default objectPropertyStore;
