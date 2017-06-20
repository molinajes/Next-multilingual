import {observable, action} from 'mobx';
import uuid from 'uuid';
import Actor from '../models/actorModel';

import removeItemFromArray from '../utils/removeItemFromArray';
import getItemFromArray from '../utils/getItemFromArray';

import {AppToaster} from '../components/Toaster/AppToaster';

class ActorStore {
	@observable actorData = [];

	@action
	clearStore() {
		this.actorData = [];
	}

	@action
	createActor(name) {
		const id = uuid();
		const newActor = new Actor(id, name);

		const args = [
			{
				field: 'name',
				value: name
			},
			{
				field: 'parent_id',
				value: '-1'
			}
		];

		this.actorData.push(newActor);

		return newActor.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Actor' });
			removeItemFromArray(this.actorData, id);
		})
	}

	@action 
	editActor(id, field, value) {
		const data = this.actorData.find(obj => obj.persistent_id === id);
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
			AppToaster.show({ message: 'Error In Updating Actor' });
			data[field] = previousValue;
		})
	}

	@action
	mergeActor(actorId, mergeIntoId) {
		
		const actor = getItemFromArray(this.actorData, actorId);

		removeItemFromArray(this.actorData, actorId)
		// alert("Not implemented yet " +  mergeIntoId)
		actor.merge(actorId, mergeIntoId)
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting Actor' });
			this.actorData.push(actor);
		})

	}

}

const actorStore = new ActorStore();

export default actorStore;
