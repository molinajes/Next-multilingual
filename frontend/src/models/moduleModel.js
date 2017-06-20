import {observable} from 'mobx';
import BaseModel from './baseModel';

import removeItemFromArray from '../utils/removeItemFromArray';

export default class Module extends BaseModel {
	
	@observable basicType;

	constructor(id, name) {
		super(id, name);
		this.parent_id = '0';
		this.object = '21';
	}

	removeChildById(id) {
		removeItemFromArray(this.requirements, id, 'id');
	}

	removeChildBypersistentId(persistentId) {
		removeItemFromArray(this.requirements, persistentId, 'persistent_id');
	}

	
}
