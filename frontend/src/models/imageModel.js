import BaseModel from './baseModel';

export default class Image extends BaseModel {
	constructor(id, name, ifaceId) {
		super(id, name)
		this.parent_id = ifaceId;
		this.object = '11';
	}
}
