import {observable} from 'mobx';
import BaseModel from './baseModel';

export default class Flow extends BaseModel {
	@observable steps;

	constructor(id, name, useCaseId, startId, rejoinId) {
		super(id, name)
		this.object = '8';
		this.name = name;
		this.parent_id = useCaseId;
		this.related1_id = startId;
		this.related2_id = rejoinId;
		this.steps = [];
	}
}
