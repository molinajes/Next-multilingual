import BaseModel from './baseModel';

export default class ObjectProperty extends BaseModel {
	constructor(id, name, objectId, number) {
		super(id, name);
		this.parent_id = objectId;
		this.object = '7';
		this.number = number;
	}
}
