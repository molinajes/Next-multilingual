import BaseModel from './baseModel';

export default class FormProperty extends BaseModel {
	constructor(id, name, formId) {
		super(id, name);
		this.object = '3';
		this.parent_id = formId;
		this.flag = false;
	}
}
