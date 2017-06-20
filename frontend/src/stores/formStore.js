import {observable, action} from 'mobx';

import Form from '../models/formModel';

import getItemFromArray from '../utils/getItemFromArray';
import removeItemFromArray from '../utils/removeItemFromArray';

import {AppToaster} from '../components/Toaster/AppToaster';

import mainStore from './mainStore';

class FormStore {
	@observable formData = [];

	@action
	clearStore() {
		this.formData = [];
	}

	@action createForm(id, name) {
		const newForm = new Form(id, name);

		const args = [
			{
				field: 'name',
				value: name
			}
		];

		this.formData.push(newForm);

		return newForm.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Form' });
			removeItemFromArray(this.formData, id);
		})
	}

	@action
	createAndLinkForm(id, parentId, name, componentTypeId, joinType) {
		const newForm = new Form(id, name);

		this.formData.push(newForm);

		return newForm.createAndLink(parentId, name, componentTypeId, joinType);
	}

	@action editForm(id, field, value) {
		const data = this.formData.find(obj => obj.persistent_id === id);
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
			AppToaster.show({ message: 'Error In Updating Form' });
			data[field] = previousValue;
		})
	}

	@action
	deleteForm(formId) {
		
		const form = getItemFromArray(this.formData, formId, 'persistent_id');

		removeItemFromArray(this.formData, formId, 'persistent_id')

		form.delete()
		.then(response => {
			mainStore.handleDeleteResponse(response.data.content.slice(1));
		})
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Form' });
			this.formData.push(form);
		})
	}

}

const formStore = new FormStore();

export default formStore;
