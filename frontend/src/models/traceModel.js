import BaseModel from './baseModel';

export default class Trace extends BaseModel {
	constructor(id, objectTypeId, objectId, basicId) {
		super(id, '')
		this.type = objectTypeId;
		this.related1_id = objectId;
		this.parent_id = basicId;
		this.object = '22';
	}
}
