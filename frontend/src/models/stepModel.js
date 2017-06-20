import BaseModel from './baseModel';

export default class Step extends BaseModel {
	constructor(id, actorId, flowId, text, result, number) {
		super(id, '')
		this.object = '9';
		this.parent_id = flowId;
		this.text = text;
		this.text2 = result;
		this.related1_id = actorId;
		this.number = number;
	}
}
