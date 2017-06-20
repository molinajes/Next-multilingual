import BaseModel from './baseModel';

export default class StepObject extends BaseModel {
	
	constructor(id, stepId, objectId, objectType) {
		super(id, 'stepObject')
		this.object = '14';
		this.parent_id = stepId;
		this.related1_id = objectId;
		this.type = objectType
	}
}
