import {observable} from 'mobx';
import BaseModel from './baseModel';

import removeItemFromArray from '../utils/removeItemFromArray';

export default class PackageModel extends BaseModel {
	@observable useCases;
	constructor(id, name) {
		super(id, name)
		this.object = '5';
		this.useCases = [];
	}

	removeChildById(id) {
		removeItemFromArray(this.useCases, id, 'id');
	}

	removeChildBypersistentId(persistentId) {
		removeItemFromArray(this.useCases, persistentId, 'persistent_id');
	}
}
