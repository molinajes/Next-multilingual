import {observable} from 'mobx';
import BaseModel from './baseModel';

export default class Detail extends BaseModel {

	@observable basicType;

	constructor(id, name, groupId) {
		super(id, name);
		this.parent_id = groupId;
		this.object = '21';
	}
}
