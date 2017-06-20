import {observable, action} from 'mobx';
import BaseModel from './baseModel';

// import removeItemFromArray from '../utils/removeItemFromArray';

export default class Requirement extends BaseModel {
	@observable basicType;
	@observable expanded;

	constructor(id, name, groupId, number) {
		super(id, name);
		this.parent_id = groupId;
		this.object = '21';
		this.details = [];
		this.number = `${number}`;		
		this.expanded = true;
	}

	@action setExpanded = (value) => {
		this.expanded = value;
	}

}
