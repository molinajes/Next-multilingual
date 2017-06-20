import {observable, action} from 'mobx';
import uuid from 'uuid';
import Category from '../models/categoryModel';

import removeItemFromArray from '../utils/removeItemFromArray';
import getItemFromArray from '../utils/getItemFromArray';

import {AppToaster} from '../components/Toaster/AppToaster';

class CategoryStore {
	@observable categoryData = [];

	@action
	clearStore() {
		this.categoryData = [];
	}

	@action
	createCategory(name, flag) {
		const id = uuid();
		const newCategory = new Category(id, name, flag);

		const args = [
			{
				field: 'name',
				value: name
			},
			{
				field: 'flag',
				value: flag
			}
		];

		this.categoryData.push(newCategory);

		return newCategory.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Category' });
			removeItemFromArray(this.categoryData, id);
		})
	}

	@action 
	editCategory(id, field, value) {
		const data = this.categoryData.find(obj => obj.persistent_id === id);
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
			AppToaster.show({ message: 'Error In Updating Category' });
			data[field] = previousValue;
		})
	}

	@action
	deleteCategory(categoryId) {
		
		const category = getItemFromArray(this.categoryData, categoryId);

		removeItemFromArray(this.categoryData, categoryId)

		category.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Category' });
			this.categoryData.push(category);
		})

	}

}

const categoryStore = new CategoryStore();

export default categoryStore;
