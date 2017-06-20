import {observable, action} from 'mobx';
import uuid from 'uuid';

import getItemFromArray from '../utils/getItemFromArray';
import removeItemFromArray from '../utils/removeItemFromArray';

import FormProperty from '../models/formPropertyModel';
import componentStore from './componentStore';

import {AppToaster} from '../components/Toaster/AppToaster';

class FormPropertyStore {
	@observable formPropertyData = [];

	@action
	clearStore() {
		this.formPropertyData = [];
	}

	@action
	createFormProperty(formId) {
		const randId = uuid();
		const newFormProperty = new FormProperty(randId, '', formId);

		this.formPropertyData.push(newFormProperty);

		let parentArray = getItemFromArray(componentStore.componentData.form, formId);
		// Error checking for finding parent.
		if (parentArray === -1) {
			return Promise.reject('Failed to get parent array when creating a flow.')
		}
		// Get the use cases in the parent form
		parentArray = parentArray.children;

		parentArray.push(newFormProperty);
		
		const args = [
			{
				field: 'parent_id',
				value: formId
			}
		]

		newFormProperty.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Form Property' });
			removeItemFromArray(parentArray, randId);
			removeItemFromArray(this.formPropertyData, randId);
		})
	}

	@action
	editFormProperty(formPropertyId, field, value) {
		const data = this.formPropertyData.find(obj => obj.persistent_id === formPropertyId);
		data[field] = value;

		const args = [
			{
				field: field,
				value: value
			}
		]		

		data.update(args);
	}

	// @action
	// deleteFormProperty(formPropertyId, formId) {
		
	// }
	@action
	deleteFormProperty(formProperty) {

		let parentArray = getItemFromArray(componentStore.componentData.form, formProperty.parent_id);
		// Error checking for finding parent.
		if (parentArray === -1) {
			AppToaster.show({ message: 'Error In Deleting Flow' });
			return;
		}
		// Get the use cases in the parent UC
		parentArray = parentArray.children;

		removeItemFromArray(this.formPropertyData, formProperty.persistent_id);
		removeItemFromArray(parentArray, formProperty.persistent_id);

		formProperty.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Form Property' });
			this.formPropertyData.push(formProperty);
			parentArray.push(formProperty);
		})

	}

	@action
	clearItemFromStore(id) {
		removeItemFromArray(this.formPropertyData, id);
	}

}

const formPropertyStore = new FormPropertyStore();

export default formPropertyStore;
