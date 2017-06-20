import BaseModel from './baseModel';

export default class IfaceType extends BaseModel {
	constructor(id, name) {
		super(id, name)

		this.object = '13';
	}
}
