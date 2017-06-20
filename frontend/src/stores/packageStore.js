import {observable, action} from 'mobx';
import uuid from 'uuid';

import PackageModel from '../models/packageModel';

import removeItemFromArray from '../utils/removeItemFromArray';

import {AppToaster} from '../components/Toaster/AppToaster';


class PackageStore {
	@observable packageData = [];

	@action
	clearStore() {
		this.packageData = [];
	}

	@action
	createPackage(name) {
		const randId = uuid();

		const newPackage = new PackageModel(randId, name);

		const args = [
			{
				field: 'name',
				value: name
			},
			{
				field: 'parent_id',
				value: '-1'
			}
		]

		this.packageData.push(newPackage);

		return newPackage.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Package' });
			removeItemFromArray(this.packageData, randId);
		})
	}

	@action
	editPackage(packageId, field, value) {
		const data = this.packageData.find(obj => obj.persistent_id === packageId);
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

	@action
	deletePackage(packageData) {


		removeItemFromArray(this.packageData, packageData.persistent_id);

		packageData.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Package' });
			this.packageData.push(packageData);
		})


	}
}

const packageStore = new PackageStore();

export default packageStore;
