import BaseModel from './baseModel';

export default class Category extends BaseModel {
	constructor(id, name, flag) {
		super(id, name)
		this.object = '17';
		this.flag = flag;
	}
}
