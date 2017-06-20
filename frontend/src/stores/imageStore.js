import {observable, action} from 'mobx';
import uuid from 'uuid';

import ifaceStore from './ifaceStore';

import getItemFromArray from '../utils/getItemFromArray';
import removeItemFromArray from '../utils/removeItemFromArray';

import Image from '../models/imageModel';

import {AppToaster} from '../components/Toaster/AppToaster';

class ImageStore {
	@observable imageData = [];

	@action
	clearStore() {
		this.imageData = [];
	}

	@action
	createImage(file, ifaceId) {
		const randId = uuid();

		const newImage = new Image(randId, file, ifaceId);

		const args = [
			{
				field: 'parent_id',
				value: ifaceId
			},
			{
				field: 'name',
				value: file
			}
		]

		let parentArray = getItemFromArray(ifaceStore.ifaceData, ifaceId);
		// Error checking for finding parent.
		if (parentArray === -1) {
			return Promise.reject('Failed to get parent array when creating an image.')
		}
		// Get the use cases in the parent package
		parentArray = parentArray.children;

		parentArray.push(newImage);

		this.imageData.push(newImage);

		return newImage.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Image' });
			removeItemFromArray(parentArray, randId);
			removeItemFromArray(this.imageData, randId);
		})
	}

	@action
	loadImage(data) {

		const newImage = new Image();

		this.imageData.push(newImage);

		newImage.load(data);

		const parentArray = getItemFromArray(ifaceStore.ifaceData, data.parent_id, 'persistent_id');

		parentArray.children.push(newImage);
	}

	@action editImage(id, field, value) {
		const data = this.imageData.find(obj => obj.persistent_id === id);
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
			AppToaster.show({ message: 'Error In Updating Image' });
			data[field] = previousValue;
		})
	}

	@action
	deleteImage(image) {

		let parentArray = getItemFromArray(ifaceStore.ifaceData, image.parent_id);
		// Error checking for finding parent.
		if (parentArray === -1) {
			AppToaster.show({ message: 'Error In Deleting Image' });
			return;
		}
		// Get the use cases in the parent UC
		parentArray = parentArray.children;

		removeItemFromArray(this.imageData, image.persistent_id);
		removeItemFromArray(parentArray, image.persistent_id);

		image.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Image' });
			this.imageData.push(image);
			parentArray.push(image);
		})
	}


}

const imageStore = new ImageStore();

export default imageStore;
